import { useCallback, useEffect, useState } from 'react';

import debounce from 'lodash/debounce';
import { useSession } from 'next-auth/react';

import Search from '../../assets/icons/search.svg';
import Twitter from '../../assets/icons/twitter.svg';
import styles from '../../styles/components/layout/searchPosts.module.scss';

export default function SearchPosts () {
	const { data: session } = useSession();
	const [query, setQuery] = useState('');

	const fetchTweets = (value) => debounce(async () => {
		const req = await fetch(`/api/twitter/search?q=${value}`);
		const data = await req.json();
	}, 500);

	const onInput = ({ target }) => {
		fetchTweets(target.value)();
		setQuery(target.value);
	};

	return (<div className={styles.searchPosts}>
		<div className={styles.searchBox}>
			<input value={query} onChange={onInput}
				placeholder='Search tweets'
			/>
			<Twitter className={styles.twitterIcon} />
			<Search className={styles.searchIcon} />
		</div>
	</div>);
}
