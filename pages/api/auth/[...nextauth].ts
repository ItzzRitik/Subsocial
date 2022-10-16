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
			console.log(profile);
			return true;
		},
		async redirect () {
			return '/';
		},
	},
};
const Authenticate = (req, res) => NextAuth(req, res, authOption);

export default Authenticate;
