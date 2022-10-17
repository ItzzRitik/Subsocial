import styles from '../../styles/components/layout/postCard.module.scss';

export default function PostCard ({ post }: PropTypes) {
	const { text, user } = post;

	return (
		<div className={styles.postCard}>
			<div className={styles.header}>
				<span className={styles.avatar} style={{ background: `url(${user.profile_image_url_https})` }} />
				<div className={styles.userData}>
					<p className={styles.name}>{user.name}</p>
					<p className={styles.userName}>@{user.screen_name}</p>
				</div>
			</div>
			<div className={styles.content}>
				<p className={styles.postText}>{text}</p>
			</div>
		</div>
	);
}

interface PostType {
	text: string
}
interface PropTypes {
	post: PostType
}
