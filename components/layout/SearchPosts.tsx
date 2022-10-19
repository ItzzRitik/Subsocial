import { useEffect, useRef, useState } from 'react';

import debounce from 'lodash/debounce';
import { useRouter } from 'next/router';

import Avatar from '../../assets/icons/avatar.svg';
import Hash from '../../assets/icons/hash.svg';
import Search from '../../assets/icons/search.svg';
import Twitter from '../../assets/icons/twitter.svg';
import styles from '../../styles/components/layout/searchPosts.module.scss';

import Loader from './Loader';
import PostCard from './PostCard';

const SearchIndicator = ({ value }: {value: string | undefined}) => {
	if (value?.startsWith?.('@')) {
		return <Avatar className={styles.avatarIcon} />;
	}
	if (value?.startsWith?.('#')) {
		return <Hash className={styles.avatarIcon} />;
	}

	return <Search className={styles.searchIcon} />;
};

export default function SearchPosts () {
	const router = useRouter();
	const { search } = router.query;
	const [tweets, setTweets] = useState([]);
	const [loading, setLoading] = useState(false);

	const fetchTweets = useRef(debounce(async (value) => {
		setLoading(true);
		const req = await fetch(`/api/twitter/search?q=${encodeURIComponent(value)}`);
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
				{loading ? <Loader className={styles.loader} small /> : <SearchIndicator value={search?.toString()} />}
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
