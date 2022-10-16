import styles from '../../styles/components/base/button.module.scss';

import ProgressBar from './ProgressBar';

export default function Button (props) {
	const { className, dark, Icon, image, label = '', tooltip, back, link, reverse, newTab, onClick, stopPropagation } = props;
	const performClick = (event) => {
		if (stopPropagation) event.stopPropagation();
		if (link) {
			return newTab ? window.open(link, '_blank') : '';
		}
		if (onClick) {
			return onClick();
		}
	};
	const IconComponent = Icon ? <Icon className={styles.icon} /> : image ?
		<span className={styles.image} style={{ backgroundImage: `url(${image})` }} /> : '';

	let buttonClass = styles.button;
	className && (buttonClass += ` ${className}`);
	dark && (buttonClass += ` ${styles.dark}`);
	(Icon || image) && (buttonClass += ` ${styles.icon}`);
	back && (buttonClass += ` ${styles.back}`);
	link && (buttonClass += ` ${styles.link}`);
	label && (buttonClass += ` ${styles.label}`);

	return (
		<div className={buttonClass} title={tooltip ? tooltip : label} onClick={performClick}>
			{back ? <span className={styles.background} /> : <ProgressBar className={styles.underline} dark={dark} />}
			{!reverse && IconComponent}
			{label && <p className={styles.label}>{label}</p>}
			{reverse && IconComponent}
		</div>
	);
}
