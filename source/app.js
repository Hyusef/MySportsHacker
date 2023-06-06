import React from 'react';
import { Text, useApp, useInput } from 'ink';
import Header from './components/Header.js';
import Selector from './components/Selector.js';
import Introtext from './components/Introtext.js';


const MyContext = React.createContext();

export default function App({ name = '' }) {
	const { exit } = useApp();

	useInput((input) => {
		if (input == 'q') {
			exit()
		}
	});

	return (
		<>
			<MyContext.Provider value={''}>
				<Header />
				<Introtext />
				<Selector />
			</MyContext.Provider>
		</>
	);
}
