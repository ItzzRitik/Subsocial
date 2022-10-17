import { useCallback, useEffect, useRef, useState } from 'react';

import debounce from 'lodash/debounce';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import Search from '../../assets/icons/search.svg';
import Twitter from '../../assets/icons/twitter.svg';
import styles from '../../styles/components/layout/searchPosts.module.scss';

import PostCard from './PostCard';

export default function SearchPosts () {
	const { data: session } = useSession();
	const router = useRouter();
	const { search } = router.query;
	const [tweets, setTweets] = useState([]);

	const fetchTweets = useRef(debounce(async (value) => {
		const req = await fetch(`/api/twitter/search?q=${value}`);
		const { data = [] } = await req.json();

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
				<Search className={styles.searchIcon} />
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
