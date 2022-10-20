// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { waitReady } from '@polkadot/wasm-crypto';
import { IpfsContent } from '@subsocial/types/substrate/classes';
import { useSession } from 'next-auth/react';
import SweetAlert from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import Cloud from '../../assets/icons/cloud.svg';
import styles from '../../styles/components/layout/postCard.module.scss';
import Button from '../base/Button';
import { useSubsocial } from '../provider';

import HashTag from './Hashtag';

export default function PostCard ({ post, onInput }: PropTypes) {
	const { data: session } = useSession();
	const {
		id_str,
		created_at,
		entities: { hashtags },
		lang,
		text,
		user,
	} = post;

	const { api, keyring } = useSubsocial();
	const Swal = withReactContent(SweetAlert);

	const onBackup = async () => {
		await waitReady();
		const cid = await api.ipfs.saveContent({
			title: user.name,
			image: user.profile_image_url_https,
			tags: hashtags,
			body: text,
			canonical: `https://twitter.com/twitter/status/${id_str}`,
			twitterData: {
				id_str,
				backupOwner: session?.screen_name ?? '',
				lang,
				user,
				created_at,
			},
		});
		const substrateApi = await api.blockchain.api;
		const spaceId = '10102';
		const postTransaction = substrateApi.tx.posts.createPost(
			spaceId,
			{ RegularPost: null },
			IpfsContent(cid),
		);
		postTransaction.signAndSend(keyring, async (result: ResultType) => {
			const { status } = result;

			if (!result || !status) {
				return;
			}

			if (status.isFinalized || status.isInBlock) {
				const blockHash = status.isFinalized
					? status.asFinalized
					: status.asInBlock;

				Swal.fire({
					icon: 'success',
					title: 'Backup Successful!',
					text: `Block hash for the transaction: ${blockHash.toString()}`,
				});
			} else if (result.isError) {
				console.log(JSON.stringify(result));
			} else {
				Swal.fire({
					icon: 'success',
					title: 'Backup Initiated!',
					text: `⏱ Current tx status: ${status.type}`,
					timer: 4000,
				});
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
				<div className={styles.userData} onClick={() =>
					window.open(
						`https://twitter.com/twitter/status/${id_str}`,
						'_blank',
					)
				}
				>
					<p className={styles.name} title={user.name}>
						{user.name}
					</p>
					<p className={styles.userName} title={user.screen_name}>
						@{user.screen_name}
					</p>
				</div>
				<Button
					className={styles.backup}
					Icon={Cloud}
					onClick={onBackup}
					tooltip='Backup to subsocial'
					back
					stopPropagation
				/>
			</div>
			<div className={styles.content}>
				<HashTag textClass={styles.postText} hashtagClass={styles.hashtag}
					usernameClass={styles.username} value={text}
					onClick={(val) => onInput(val, true)}
				/>
			</div>
		</div>
	);
}

export interface PostType {
	id_str: string;
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
}

interface PropTypes {
	onInput: (value: string) => void;
	post: PostType;
}

interface ResultType {
	isError: boolean;
	status: {
		type: string;
		isFinalized: boolean;
		asFinalized: string;
		isInBlock: boolean;
		asInBlock: string;
		isError: string;
	};
}
