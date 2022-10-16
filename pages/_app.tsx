import Head from 'next/head';

import GlobalContextProvider from '../components/context';
import '../styles/globals.scss';

import type { AppProps } from 'next/app';

export default function MyApp (props: AppProps) {
	const { Component, pageProps } = props;

	return (
		<GlobalContextProvider session={pageProps.session}>
			<Head><title>Subsocial</title></Head>
			<Component {...pageProps} />
		</GlobalContextProvider>
	);
}
