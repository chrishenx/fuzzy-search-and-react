import React, { Component } from 'react';
import TransactionsService from './transactions-service';
import TransactionsView from './transactions-view';

import './styles.css';

export default class SearchTransactionsView extends Component {

	constructor(props) {
		super(props);
		this.state = {
			transactions: [],
		};
	}

	componentDidMount() {
		this.updateTransactions('');
	}

	handleQueryChange(event) {
		this.updateTransactions(event.target.value);
	}

	updateTransactions(query) {
		TransactionsService.search(query)
			.then((transactions) => {
				this.setState({ transactions });
			})
			.catch((error) => {
				console.error('updateTransactions - error = ', error)
				window.alert('We could get your transactions, sorry :(');
			});
	}

	render() {
		return (
			<div className="search-transactions-view">
				<input type="text" placeholder="Search for transactions" className="search-transactions-query" onChange={this.handleQueryChange.bind(this)} />
				<TransactionsView transactions={this.state.transactions} />
			</div>
		);
	}

}