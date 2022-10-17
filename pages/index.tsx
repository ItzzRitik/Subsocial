import { useSession } from 'next-auth/react';

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
			<Login />
		</div>
	);
};

export default Home;
