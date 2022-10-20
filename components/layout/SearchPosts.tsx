import { useSelector } from 'react-redux';

import Avatar from '../../assets/icons/avatar.svg';
import Hash from '../../assets/icons/hash.svg';
import Search from '../../assets/icons/search.svg';
import Twitter from '../../assets/icons/twitter.svg';
import styles from '../../styles/components/layout/searchPosts.module.scss';
import { RootState } from '../provider/redux';

import Loader from './Loader';
import PostCard, { PostType } from './PostCard';

const SearchIndicator = ({ value }: {value: string | undefined}) => {
	if (value?.startsWith?.('@')) {
		return <Avatar className={styles.avatarIcon} />;
	}
	if (value?.startsWith?.('#')) {
		return <Hash className={styles.avatarIcon} />;
	}

	return <Search className={styles.searchIcon} />;
};

export default function SearchPosts ({ search, onInput }: PropTypes) {
	const { tweets, loading } = useSelector((state: RootState) => state.tweets);

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
					tweets?.map((tweet: PostType) =>
						<PostCard key={tweet.id_str} post={tweet} onInput={onInput} />,
					)
				}
			</div>
		</div>
	);
}

interface PropTypes {
	search: string;
	onInput: (value: string) => void;
}
