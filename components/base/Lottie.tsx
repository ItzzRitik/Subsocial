import React, { useEffect, useRef } from 'react';

import LottieWeb from 'lottie-web';

import styles from '../../styles/components/base/lottie.module.scss';

export default function Lottie (props) {
	const {
		speed, className, animationData,
		show = true,
		clickToPause = false,
		pause = false,
		loop = true,
		autoplay = true,
		segments = false,
		rendererSettings = {},
	} = props;
	const lottieRef = useRef();
	const lottieAnim = useRef();

	const onClick = () => {
		if (lottieAnim.current.isPaused) {
			return lottieAnim.current.play();
		}

		return lottieAnim.current.pause();
	};

	useEffect(() => {
		if (clickToPause) {
			pause ? lottieAnim?.current?.pause() : lottieAnim?.current?.play();
		}
	}, [clickToPause, pause]);

	useEffect(() => {
		if (lottieRef?.current?.children.length > 0) {
			return;
		}

		if (!animationData) {
			throw new Error('Animation data is required');
		}

		lottieAnim.current = LottieWeb.loadAnimation({
			loop,
			autoplay,
			segments,
			animationData,
			renderer: 'svg',
			container: lottieRef.current,
			rendererSettings: {
				...rendererSettings,
				preserveAspectRatio: 'xMidYMid slice',
				className: `${className?.trim().replace(/ .*/, '')}SVG`,
			},
		});
		speed && lottieAnim.current.setSpeed(speed);
	}, [animationData, autoplay, className, loop, rendererSettings, segments, speed]);

	let lottieClass = styles.lottie;
	className && (lottieClass += ` ${className}`);
	clickToPause && (lottieClass += ` ${styles.clickToPause}`);

	if (!show) return null;

	return (
		<div className={lottieClass} ref={lottieRef} onClick={clickToPause ? onClick : null} />
	);
}
