import React from 'react';
import { Text, useApp, useInput } from 'ink';
import Header from './components/Header.js';
import Selector from './components/Selector.js';
import Introtext from './components/Introtext.js';

export default function App() {
	const { exit } = useApp();

	useInput((input) => {
		if (input == 'q') {n
			exit()
		}
	});

	return (
		<>
				<Header />
				<Introtext />
				<Selector />
		</>
	);
}
