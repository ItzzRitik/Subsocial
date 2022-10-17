/* eslint-disable max-len */
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	static async getInitialProps (ctx: any) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}
	render () {
		return (
			<Html>
				<Head>
					<link rel='stylesheet'
						href='https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500&display=swap'
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
