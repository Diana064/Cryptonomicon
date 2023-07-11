const API_KEY =
	'a01d01c939e0ae6ce6a6a918da69b1d68a5d56e6dbfe9d32d96f51a480ecf899';
const tickersHandlers = new Map();
const loadTickers = () =>{
	if (tickersHandlers.size === 0){
		console.log('empty')
		return;
	}
	fetch(
		`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${[...tickersHandlers
			.keys()
			].join(
			","
		)}&tsyms=USD&api_key=${API_KEY}`
	).then((r) => r.json()).then(rawData =>{
		const updatedPrice = Object.fromEntries(
		Object.entries(rawData).map(([key, value]) =>
			[key, value.USD])
	);
		Object.entries(updatedPrice).forEach(([currency, newPrice]) => {
			const handlers = tickersHandlers.get(currency) ?? [];
			handlers.forEach(fn=>fn(newPrice) )
		})
	});}
export const subscribeToTicker = (ticker, cb)=>{
	const subscribers = tickersHandlers.get(ticker) || [];
	tickersHandlers.set(ticker, [...subscribers, cb])
}
export const unsubscribeFromTicker = (ticker)=> {

	tickersHandlers.delete(ticker);
}
setInterval(loadTickers,5000)
window.tickers = tickersHandlers;