import React from 'react'

var StockListEntry = ({stock, stockEntryListClick, stockEntryListRemove}) => (
	<div className="stocklistentry row" onClick={() => stockEntryListClick(stock)}>
		<div className="col-md-7">
			<div className="stockSymbol">{stock.symbol}</div>
			<div className="stockName">{stock.Name}</div>
		</div>
		<div className="col-md-5">
			<div className="row">
				<div className="col-md-8">
					<div className={stock.Change_PercentChange.split(" - ")[1].charAt(0)==="+" ? "positive stockPrice " : "negative stockPrice "}>{stock.LastTradePriceOnly}</div>
					<div className={stock.Change_PercentChange.split(" - ")[1].charAt(0)==="+" ? "positive stockChange " : "negative stockChange"}>{stock.Change_PercentChange.split(' - ')[1]}</div>
				</div>
				<div className="col-md-4 closeContainer">
					<button type="button" className="stockremove" aria-label="Close" onClick={()=> stockEntryListRemove(stock.symbol)}><span aria-hidden="true">&times;</span></button>
				</div>
			</div>
		</div>
	</div>
);

export default StockListEntry;