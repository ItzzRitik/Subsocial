import { waitReady } from '@polkadot/wasm-crypto';
import { IpfsContent } from '@subsocial/types/substrate/classes';

import Cloud from '../../assets/icons/cloud.svg';
import styles from '../../styles/components/layout/postCard.module.scss';
import Button from '../base/Button';
import { useSubsocial } from '../provider';

export default function PostCard ({ post }: PropTypes) {
	const {
		id,
		created_at,
		entities: { hashtags },
		lang,
		text,
		user,
	} = post;
	const { api, keyring } = useSubsocial();

	const onBackup = async () => {
		await waitReady();
		const cid = await api.ipfs.saveContent({
			id,
			text,
			hashtags,
			lang,
			user,
			created_at,
		});
		const substrateApi = await api.blockchain.api;
		const spaceId = '10102';
		const postTransaction = substrateApi.tx.posts.createPost(
			spaceId,
			{ RegularPost: null },
			IpfsContent(cid),
		);
		postTransaction.signAndSend(keyring, async (result) => {
			const { status } = result;

			if (!result || !status) {
				return;
			}

			if (status.isFinalized || status.isInBlock) {
				const blockHash = status.isFinalized
					? status.asFinalized
					: status.asInBlock;

				console.log(
					`✅ Tx finalized. Block hash: ${blockHash.toString()}`,
				);
			} else if (result.isError) {
				console.log(JSON.stringify(result));
			} else {
				console.log(`⏱ Current tx status: ${status.type}`);
			}
		});
	};

	return (
		<div className={styles.postCard}>
			<div className={styles.header}>
				<span
					className={styles.avatar}
					style={{
						backgroundImage: `url(${user.profile_image_url_https})`,
					}}
				/>
				<div className={styles.userData}>
					<p className={styles.name}>{user.name}</p>
					<p className={styles.userName}>@{user.screen_name}</p>
				</div>
				<Button
					className={styles.backup}
					Icon={Cloud}
					onClick={onBackup}
					tooltip='sign out'
					back
					stopPropagation
				/>
			</div>
			<div className={styles.content}>
				<p className={styles.postText}>{text}</p>
			</div>
		</div>
	);
}

interface PropTypes {
	post: {
		id: number;
		created_at: string;
		text: string;
		lang: string;
		entities: {
			hashtags: string[];
		};
		user: {
			name: string;
			screen_name: string;
			profile_image_url_https: string;
		};
	};
}