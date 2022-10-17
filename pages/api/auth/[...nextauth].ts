import NextAuth from 'next-auth';
import TwitterProvider from 'next-auth/providers/twitter';

export default NextAuth({
	providers: [
		TwitterProvider({
			clientId: process.env.TWITTER_CONSUMER_KEY,
			clientSecret: process.env.TWITTER_CONSUMER_SECRET,
		}),
	],
	secret: process.env.NEXT_AUTH_SECRET,
	callbacks: {
		async jwt ({ token, account }) {
			if (account) {
				token['credentials'] = {
					authToken: account.oauth_token,
					authSecret: account.oauth_token_secret,
				};
			}
			return token;
		},
	},
});
