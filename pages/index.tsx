import { useEffect, useRef, useState } from 'react';

import { debounce, pick } from 'lodash';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import Power from '../assets/icons/power.svg';
import Button from '../components/base/Button';
import Loader from '../components/layout/Loader';
import Login from '../components/layout/Login';
import SearchPosts from '../components/layout/SearchPosts';
import { AppDispatch, fetchTweets, RootState } from '../components/provider/redux';
import styles from '../styles/Home.module.scss';

import type { NextPage } from 'next';

const Home: NextPage = () => {
	const { data: session } = useSession();
	const screenName = session?.user?.screen_name;
	const dispatch = useDispatch<AppDispatch>();
	const router = useRouter();
	const searchQuery = (router?.query?.search ?? '')?.toString();
	const [search, setSearch] = useState(decodeURIComponent(searchQuery + ''));
	const { tweets } = useSelector((state: RootState) => state.tweets);

	const fetchTweetsDebounced = useRef(
		debounce(async (query) => {
			dispatch(fetchTweets(query));
		}, 300),
	).current;
	const syncSearchQueryDebounced = useRef(
		debounce(async (query) => {
			setSearch(decodeURIComponent(query + ''));
		}, 300),
	).current;

	useEffect(() => {
		fetchTweetsDebounced(search);
	}, [fetchTweetsDebounced, search]);

	useEffect(() => {
		syncSearchQueryDebounced(searchQuery);
	}, [searchQuery, syncSearchQueryDebounced]);

	const onInput = (value: string, push?: boolean) => {
		setSearch(value);
		if (value) {
			router.query.search = value;
		}
		else delete router.query.search;
		(push ? router.push : router.replace)(pick(router, ['pathname', 'query']), undefined, {
			shallow: true,
		});
	};

	return (
		<div className={`${styles.home} ${tweets?.length > 0 ? styles.hideBack : ''}`}>
			{
				session === undefined
					? <Loader className={styles.loader} fullPage />
					: <>
						<SearchPosts search={search} onInput={onInput} />
						{session && (
							<>
								<div className={styles.avatar}>
									<span
										onClick={() => onInput(`@${screenName}`, true)}
										style={{
											backgroundImage: `url(${session?.user?.image})`,
										}}
									/>
								</div>
								<div className={styles.signOut}>
									<Button
										Icon={Power}
										tooltip='sign out'
										onClick={session && signOut}
										back
										stopPropagation
									/>
								</div>
							</>
						)}

						<Login />
					</>
			}
		</div>
	);
};

export default Home;
