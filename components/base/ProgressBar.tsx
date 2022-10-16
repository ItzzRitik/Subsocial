import styles from '../../styles/components/base/progressbar.module.scss';

export default function ProgressBar (props) {
	const { className, progress, dark } = props;

	let progressClass = styles.progressBar;
	className && (progressClass += ` ${className}`);
	dark && (progressClass += ` ${styles.dark}`);

	return (
		<div className={progressClass}>
			<span className={styles.progress} style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }} />
		</div>
	);
}
