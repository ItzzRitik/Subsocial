import { useSession, signOut } from 'next-auth/react';

import Power from '../assets/icons/power.svg';
import Button from '../components/base/Button';
import Loader from '../components/layout/Loader';
import Login from '../components/layout/Login';
import SearchPosts from '../components/layout/SearchPosts';
import styles from '../styles/Home.module.scss';

import type { NextPage } from 'next';

const Home: NextPage = () => {
	const { data: session } = useSession();

	if (session === undefined) {
		return <Loader fullPage />;
	}

	return (
		<div className={styles.home}>
			<SearchPosts />
			{
				session && <>
					<div className={styles.avatar}>
						<span style={{ backgroundImage: `url(${session?.user?.image})` }} />
					</div>
					<div className={styles.signOut}>
						<Button Icon={Power} tooltip='sign out' onClick={session && signOut} back stopPropagation />
					</div>
				</>
			}

			<Login />
		</div>
	);
};

export default Home;
