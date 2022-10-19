import { useEffect, useRef, useState } from 'react';

import { debounce, pick } from 'lodash';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import Avatar from '../../assets/icons/avatar.svg';
import Hash from '../../assets/icons/hash.svg';
import Search from '../../assets/icons/search.svg';
import Twitter from '../../assets/icons/twitter.svg';
import styles from '../../styles/components/layout/searchPosts.module.scss';
import { AppDispatch, fetchTweets, RootState } from '../provider/redux';

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
	const dispatch = useDispatch<AppDispatch>();
	const router = useRouter();
	const searchQuery = (router?.query?.search ?? '')?.toString();
	const { tweets, loading } = useSelector((state: RootState) => state.tweets);

	const [search, setSearch] = useState(decodeURIComponent(searchQuery + ''));

	const fetchTweetsDebounced = useRef(debounce(async (query) => {
		dispatch(fetchTweets(query));
	}, 300)).current;

	useEffect(() => {
		fetchTweetsDebounced(searchQuery);
	}, [fetchTweetsDebounced, searchQuery]);

	useEffect(() => {
		if (!search) {
			setSearch(decodeURIComponent(searchQuery + ''));
		}
	}, [search, searchQuery]);

	const onInput = (value: string) => {
		setSearch(value);
		router.query.search = value;
		router.replace(pick(router, ['pathname', 'query']), undefined, { shallow: true });
	};

	return (
		<div className={`${styles.searchPosts} ${tweets?.length > 0 ? styles.show : ''}`}>
			<div className={styles.searchBox}>
				<input value={search} onChange={({ target }) => onInput(target.value)}
					placeholder='Search by tweets, #hashtags or @username'
				/>
				<Twitter className={styles.twitterIcon} />
				{loading ? <Loader className={styles.loader} small /> : <SearchIndicator value={search?.toString()} />}
			</div>
			<div className={styles.posts}>
				{
					tweets?.map((tweet, index) =>
						<PostCard key={index} post={tweet} onInput={onInput} />,
					)
				}
			</div>
		</div>
	);
}
