import React from 'react';
import { PropTypes } from 'prop-types'

// Reference for currency and date formating: https://www.carlrippon.com/formatting-dates-and-numbers-in-react/

export default function TransactionView({ transaction }) {
	return (
		<div className="transaction">
			<div className="transaction-amount">
				{transaction.amount}
			</div>
			<div className="transaction-detail">
				<span className="transaction-date">
					{transaction.date}
				</span>
				<div className="transaction-creditcard">
					Card: ...<strong>{transaction.card_last_four}</strong>
				</div>
			</div>
		</div>
	);
}

TransactionView.propTypes = {
	transaction: PropTypes.object.isRequired
}