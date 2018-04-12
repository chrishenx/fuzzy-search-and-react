import SearchUtils from '../utils/search';
import moment from 'moment';
import stats from 'stats-lite';

const TRANSACTIONS = [
	{ amount: 112.98, date: '27-01-2018T12:34', card_last_four: '2544' },
	{ amount: 0.45, date: '01-12-2017T9:36', card_last_four: '4434' },
	{ amount: 95.99, date: '23-11-2017T14:34', card_last_four: '3011' },
	{ amount: 7774.32, date: '17-07-2017T03:34', card_last_four: '6051' },
	{ amount: 1345.98, date: '22-06-2017T10:33', card_last_four: '0059' },
	{ amount: 2850.70, date: '27-01-2018T12:34', card_last_four: '4444' },
	{ amount: 45.00, date: '10-02-2018T02:34', card_last_four: '0110' },
	{ amount: 1.00, date: '17-02-2018T18:34', card_last_four: '1669' },
	{ amount: 4.69, date: '01-02-2018T02:34', card_last_four: '8488' },
	{ amount: 1111.11, date: '15-01-2018T21:34', card_last_four: '9912' }
];


export default class TransactionsService {

	// Ideally, this would be done in the server side and this would be only an HTTP GET request.
	static async search(query) {
		let transactions = null;
		if (!query || query.length === 0) {
			transactions = TRANSACTIONS;
		} else {
			console.log('Query = ', query);
			let amountDistances = [];
			let dateDistances = [];
			let creditCardDistances = [];
			TRANSACTIONS.forEach((transaction) => {
				let amountDistance = SearchUtils.editDistance(query, transaction.amount.toString());
				let dateDistance = SearchUtils.editDistance(query, transaction.date);
				let creditCardDistance = SearchUtils.editDistance(query, transaction.card_last_four);
				amountDistances.push(amountDistance);
				dateDistances.push(dateDistance);
				creditCardDistances.push(creditCardDistance);
				console.log({
					transaction,
					amountDistance,
					dateDistance,
					creditCardDistance
				});
			});
			let amountDistancesThreshold = stats.mean(amountDistances) - stats.stdev(amountDistances);
			let dateDistancesMeanThreshold = stats.mean(dateDistances) - stats.stdev(dateDistances);
			let creditCardDistancesMeanThreshold = stats.mean(creditCardDistances) - stats.stdev(creditCardDistances);
			
			return TRANSACTIONS.filter((transaction, index) => {
				let amountDistance = amountDistances[index];
				let dateDistance = dateDistances[index];
				let creditCardDistance = creditCardDistances[index];
				return amountDistance < amountDistancesThreshold || dateDistance < dateDistancesMeanThreshold || creditCardDistance < creditCardDistancesMeanThreshold;
			});
		}
		const dateFormat = 'DD-MM-YYYYTHH:mm';
		return transactions.sort((a, b) => {
			return moment(a.date, dateFormat) < moment(b.date, dateFormat);
		});
	}
}