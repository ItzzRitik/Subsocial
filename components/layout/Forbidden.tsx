import { useRouter } from 'next/router';

import Confused from '../../assets/animations/confused.json';
import styles from '../../styles/components/layout/forbidden.module.scss';
import Button from '../base/Button';
import Lottie from '../base/Lottie';

export default function Forbidden (props) {
	const { className, message, home } = props;
	const router = useRouter();

	return (
		<div className={`${styles.forbidden} ${className ? className : ''}`}>
			<Lottie className={styles.animation} animationData={Confused} />
			<h1>Access forbidden</h1>
			<p>{message ? message : 'You are not allowed to access this section!'}</p>
			{home && <Button className={styles.home} label='Back to Home' back onClick={() => router.replace('/')} />}
		</div>
	);

}
