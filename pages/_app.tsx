import Head from 'next/head';

import GlobalContextProvider from '../components/provider';
import '../styles/globals.scss';

import type { AppProps } from 'next/app';

export default function MyApp (props: AppProps) {
	const { Component, pageProps: { session, ...pageProps } } = props;

	return (
		<GlobalContextProvider session={session}>
			<Head><title>Subsocial</title></Head>
			<Component {...pageProps} />
		</GlobalContextProvider>
	);
}
