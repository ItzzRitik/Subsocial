// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
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
		async jwt ({ token, account, profile }: {token: TokenType, account: AccountType, profile: ProfileType}) {
			if (profile) {
				token.userProfile = {
					screen_name: profile.screen_name,
					location: profile.location,
					description: profile.description,
					followers_count: profile.followers_count,
					friends_count: profile.friends_count,
					favourites_count: profile.favourites_count,
					verified: profile.verified,
				};
			}
			if (account) {
				token.credentials = {
					authToken: account.oauth_token,
					authSecret: account.oauth_token_secret,
				};
			}
			return token;
		},
		async session ({ session, token }) {
			const { userProfile } = token;
			session.user = { ...session.user, ...userProfile };
			return session;
		},
	},
});

interface AccountType {
	oauth_token: string;
	oauth_token_secret: string;
}

interface TokenType {
	userProfile: ProfileType;
	credentials: AccountType;
}

interface ProfileType {
	screen_name: string;
	location: string;
	description: string;
	followers_count: string;
	friends_count: string;
	favourites_count: string;
	verified: string;
}
