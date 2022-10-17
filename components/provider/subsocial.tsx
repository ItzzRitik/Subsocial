import { useState, createContext, useContext, useEffect } from 'react';

import Keyring from '@polkadot/keyring';
import { waitReady } from '@polkadot/wasm-crypto';
import { SubsocialApi, generateCrustAuthToken } from '@subsocial/api';

const SubsocialContext = createContext({ api: {}, keyring: {} });
const SubsocialProvider = ({ children }: {children: any}) => {
	const [api, setApi] = useState({});
	const [keyring, setKeyring] = useState({});

	useEffect(() => {
		(async () => {
			await waitReady();
			const mnemonic = 'bottom drive obey lake curtain smoke basket hold race lonely fit walk//Alice';
			const authHeader = generateCrustAuthToken(mnemonic);
			setKeyring((new Keyring({ type: 'sr25519' })).addFromMnemonic(mnemonic));

			SubsocialApi.create({
				offchainUrl: '',
				substrateNodeUrl: 'wss://rco-para.subsocial.network',
				ipfsNodeUrl: 'https://crustwebsites.net',
			}).then((api) => {
				api.ipfs.setWriteHeaders({
					authorization: 'Basic ' + authHeader,
				});
				setApi(api);
			});
		})();
	}, []);

	return (
		<SubsocialContext.Provider value={{ api, keyring }}>
			{children}
		</SubsocialContext.Provider>
	);
};
const useSubsocial = () => useContext(SubsocialContext);

export { SubsocialProvider, useSubsocial };
