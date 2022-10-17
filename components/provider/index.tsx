import { SessionProvider } from 'next-auth/react';
import { Provider as ReduxProvider } from 'react-redux';

import store from './redux';
import { SubsocialProvider } from './subsocial';

export default function GlobalContextProvider ({ children, session }) {
	return (
		<ReduxProvider store={store}>
			<SubsocialProvider>
				<SessionProvider session={session}>
					{children}
				</SessionProvider>
			</SubsocialProvider>
		</ReduxProvider>
	);
}

export { useSubsocial } from './subsocial';
