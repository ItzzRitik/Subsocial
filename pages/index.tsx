import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

import Twitter from '../assets/icons/twitter.svg';
import Button from '../components/base/Button';
import Forbidden from '../components/layout/Forbidden';
import styles from '../styles/Home.module.scss';

import type { NextPage } from 'next';

const Home: NextPage = () => {
	const { data: session } = useSession();
	const router = useRouter();
	return (
		<div className={styles.home}>
			{
				!session &&
				<div className={styles.login}>
					<div className={styles.modal}>
						{
							router?.query?.error == 403 ? <Forbidden className={styles.forbidden} />
								: <h1 className={styles.title}>Authentication Required!</h1>
						}
						<Button className={styles.loginGithub} Icon={Twitter} label='sign in with twitter' back stopPropagation
							onClick={() => signIn('github')}
						/>
					</div>
				</div>
			}
		</div>
	);
};

export default Home;
