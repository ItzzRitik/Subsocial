import NextAuth from 'next-auth';
import TwitterProvider from 'next-auth/providers/twitter';

const authOption = {
	providers: [
		TwitterProvider({
			clientId: process.env.TWITTER_CONSUMER_KEY,
			clientSecret: process.env.TWITTER_CONSUMER_SECRET,
		}),
	],
	secret: process.env.NEXT_AUTH_SECRET,
	callbacks: {
		async signIn ({ profile }) {
			const requestOption = {
				method: 'POST',
				headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` },
				body: JSON.stringify({ query: '{  viewer { login }}' }),
			};
			const request = await fetch('https://api.github.com/graphql', requestOption);
			const currentUser = (await request.json()).data.viewer.login.toLowerCase();

			return currentUser.toLowerCase() === profile.login.toLowerCase() ? true : '/?error=403';
		},
		async redirect () {
			return '/';
		},
	},
};
const Authenticate = (req, res) => NextAuth(req, res, authOption);

export default Authenticate;
