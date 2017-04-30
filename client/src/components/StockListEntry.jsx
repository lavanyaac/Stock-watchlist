import React from 'react'

var StockListEntry = ({stock, stockEntryListClick}) => (
	<div className="stocklistentry" onClick={() => stockEntryListClick(stock)}>
		<span className="stockSymbol">{stock.symbol}</span>
		<span className="stockPrice">{stock.LastTradePriceOnly}</span>
		<span className="stockChange">{stock.Change_PercentChange.split(' - ')[1]}</span>
		<button className="stockremove" type="button" value="-">-</button>
	</div>
);

export default StockListEntry;