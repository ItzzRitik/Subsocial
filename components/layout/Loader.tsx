import styles from '../../styles/components/layout/loader.module.scss';

export default function Loader (props: PropType) {
	const { className, fullPage, medium, small } = props;
	let classList = styles.loader;
	className && (classList += ` ${className}`);
	fullPage && (classList += ` ${styles.fullPage}`);
	medium && (classList += ` ${styles.medium}`);
	small && (classList += ` ${styles.small}`);

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
