import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
	interface Session {
		user: {
			screen_name: string;
		} & DefaultSession['user'];
	}
}
