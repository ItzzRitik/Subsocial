import { useCallback, useEffect, useRef, useState } from 'react';

import debounce from 'lodash/debounce';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import Search from '../../assets/icons/search.svg';
import Twitter from '../../assets/icons/twitter.svg';
import styles from '../../styles/components/layout/searchPosts.module.scss';

import Loader from './Loader';
import PostCard from './PostCard';

export default function SearchPosts () {
	const router = useRouter();
	const { search } = router.query;
	const [tweets, setTweets] = useState([]);
	const [loading, setLoading] = useState(false);

	const fetchTweets = useRef(debounce(async (value) => {
		setLoading(true);
		const req = await fetch(`/api/twitter/search?q=${value}`);
		const { data = [] } = await req.json();
		setLoading(false);
		if (!value) setTweets([]);
		else setTweets(data);

	}, 300)).current;

	useEffect(() => {
		fetchTweets(search);
	}, [fetchTweets, search]);

	const onInput = ({ target }: {target: TargetValue}) => {
		router.query.search = target.value;
		router.replace(router);
	};

	return (
		<div className={`${styles.searchPosts} ${tweets.length > 0 ? styles.show : ''}`}>
			<div className={styles.searchBox}>
				<input value={search} onChange={onInput}
					placeholder='Search tweets'
				/>
				<Twitter className={styles.twitterIcon} />
				{loading ? <Loader className={styles.loader} small /> : <Search className={styles.searchIcon} />}
			</div>
			<div className={styles.posts}>
				{
					tweets.map((tweet, index) =>
						<PostCard key={index} post={tweet} />,
					)
				}
			</div>
		</div>
	);
}

interface TargetValue {
	value: string
}
