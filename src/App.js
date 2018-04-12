import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import SearchTransactionsView from './transactions/search-transactions-view';

class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Welcome to React - Fuzzy search</h1>
				</header>
				<div className="App-intro"><SearchTransactionsView /></div>
			</div>
		);
	}
}

export default App;
