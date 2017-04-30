import React from 'react';
import StockListEntry from './StockListEntry.jsx'


var StockList = ({stocks, stockEntryListClick, stockEntryListRemove}) => (
	<div className='stockListContainer'>
		<h2>This is StockList</h2>
		{
			stocks.map(stock =>
			<StockListEntry stock={stock} stockEntryListClick = {stockEntryListClick} stockEntryListRemove={stockEntryListRemove}/>)
		}
	</div>
);

export default StockList;

