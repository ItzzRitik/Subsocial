import clsx from 'clsx';

import styles from '../../styles/components/layout/loader.module.scss';

export default function Loader (props: PropType) {
	const { className, fullPage, medium, small } = props;
	const classList = clsx(
		styles.loader,
		className,
		fullPage && styles.fullPage,
		medium && styles.medium,
		small && styles.small,
	);
	return (
		<div className={classList}>
			<span />
		</div>
	);
}

interface PropType {
	className?: string;
	fullPage?: boolean;
	medium?: boolean;
	small?: boolean;
}
