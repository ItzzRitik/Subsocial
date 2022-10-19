import { MouseEvent, MouseEventHandler } from 'react';

import clsx from 'clsx';

import styles from '../../styles/components/base/button.module.scss';

export default function Button (props: PropTypes) {
	const { className, Icon, image, label = '', tooltip, back, link, reverse, newTab, onClick, stopPropagation } = props;
	const performClick: MouseEventHandler<HTMLDivElement> = (event: MouseEvent<HTMLDivElement>) => {
		if (stopPropagation) event.stopPropagation();
		if (link) {
			return newTab ? window.open(link, '_blank') : '';
		}
		if (onClick) {
			return onClick();
		}
	};

	const IconComponent = Icon ? <Icon className={styles.icon} /> : (image ?
		<span className={styles.image} style={{ backgroundImage: `url(${image})` }} /> : '');

	const classList = clsx(
		styles.button,
		className,
		(Icon || image) && styles.icon,
		back && styles.back,
		link && styles.link,
		label && styles.label,
	);

	return (
		<div className={classList} title={tooltip ? tooltip : label} onClick={performClick}>
			{back ? <span className={styles.background} /> : null}
			{!reverse && IconComponent}
			{label && <p className={styles.label}>{label}</p>}
			{reverse && IconComponent}
		</div>
	);
}

interface PropTypes {
	className?: string;
	Icon?: any;
	image?: string;
	label?: string;
	tooltip?: string;
	back?: boolean;
	reverse?: boolean;
	newTab?: boolean;
	link?: string;
	onClick: () => void;
	stopPropagation?: boolean;
}
