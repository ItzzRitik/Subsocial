import { signIn, useSession } from 'next-auth/react';

import Twitter from '../../assets/icons/twitter.svg';
import styles from '../../styles/components/layout/login.module.scss';
import Button from '../base/Button';

export default function Login () {
	const { data: session } = useSession();

	if (session !== null) {
		return null;
	}

	return (<div className={styles.login}>
		<div className={styles.modal}>
			<h1 className={styles.title}>Welcome to Subsocial!</h1>
			<Button className={styles.loginTwitter} Icon={Twitter} label='sign in with twitter' back stopPropagation
				onClick={() => signIn('twitter')}
			/>
		</div>
	</div>);
}
