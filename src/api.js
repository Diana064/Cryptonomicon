const API_KEY =
	'a01d01c939e0ae6ce6a6a918da69b1d68a5d56e6dbfe9d32d96f51a480ecf899';
export const loadTicker = (tickers) =>
	fetch(
		`https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=${tickers.join(
			','
		)}&api_key=${API_KEY}`
	).then((r) => r.json());
