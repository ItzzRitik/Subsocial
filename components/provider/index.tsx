import { SessionProvider } from 'next-auth/react';
import { Provider as ReduxProvider } from 'react-redux';

import store from './redux';

export default function GlobalContextProvider ({ children, session }) {
	return (
		<ReduxProvider store={store}>
			<SessionProvider session={session}>
				{children}
			</SessionProvider>
		</ReduxProvider>
	);
}
