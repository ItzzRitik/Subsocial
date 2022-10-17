import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import Twitter from '../../assets/icons/twitter.svg';
import styles from '../../styles/components/layout/login.module.scss';
import Button from '../base/Button';

import Forbidden from './Forbidden';

export default function Login () {
	const { data: session } = useSession();
	const router = useRouter();

	if (session !== null) {
		return null;
	}

	return (<div className={styles.login}>
		<div className={styles.modal}>
			{
				router?.query?.error == '403' ? <Forbidden className={styles.forbidden} />
					: <h1 className={styles.title}>Authentication Required!</h1>
			}
			<Button className={styles.loginTwitter} Icon={Twitter} label='sign in with twitter' back stopPropagation
				onClick={() => signIn('twitter')}
			/>
		</div>
	</div>);
}
