import React, { Component } from 'react';
import TransactionView from './transaction-view';
import { PropTypes } from 'prop-types'

export default class TransactionsView extends Component {
	render() {
		const transactions = this.props.transactions;
		return (
			<div className="transactions">
				{ transactions.map((transaction, index) => <TransactionView key={index} transaction={transaction} />) }
			</div>
		);
	}
}

TransactionsView.propTypes = {
	transactions: PropTypes.array.isRequired
}