import { getToken } from 'next-auth/jwt';
import { getSession } from 'next-auth/react';
import TwitterClient from 'twitter-lite';

export default async function Search (req, res) {
	const session = await getSession({ req });
	if (!session) {
		return res.status(403).json({ errorMessage: 'Authentication Required' });
	}

	const { q } = req.query;
	const { credentials } = await getToken({
		req,
		secret: process.env.NEXT_AUTH_SECRET,
	});

	const client = new TwitterClient({
		subdomain: 'api',
		consumer_key: process.env.TWITTER_CONSUMER_KEY,
		consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
		access_token_key: credentials.authToken,
		access_token_secret: credentials.authSecret,
	});

	try {
		const results = await client.get('search/tweets', {
			q,
		});
		return res.status(200).json({
			status: 'Ok',
			data: results.statuses,
		});
	} catch (err) {
		return res.status(400).json({
			status: err.message,
		});
	}
}
