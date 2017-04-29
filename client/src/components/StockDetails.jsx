import React from 'react';

var StockDetails = ({stockDetail}) => (
	<div className="stockdetails">
			 <div className='stockTitle'>{stockDetail.Name}</div>
			 <table className='stockTable'>
			  	<tr>
			  		<td>OPEN</td>
			  		<td>{stockDetail.Open}</td>
			  		<td>MKT CAP</td>
			  		<td>{_display(stockDetail.MarketCapitalization)}</td>
			  	</tr>
			  	<tr>
			  		<td>HIGH</td>
			  		<td>{stockDetail.DaysHigh}</td>
			  		<td>52W HIGH</td>
			  		<td>{stockDetail.YearHigh}</td>
			  	</tr>
			  	<tr>
			  		<td>LOW</td>
			  		<td>{stockDetail.DaysLow}</td>
			  		<td>52W LOW</td>
			  		<td>{stockDetail.YearLow}</td>
			  	</tr>
			  	<tr>
			  		<td>VOL</td>
			  		<td>{_display(stockDetail.Volume)}</td>
			  		<td>AVG VOL</td>
			  		<td>{_display(stockDetail.AverageDailyVolume)}</td>
			  	</tr>
			  	<tr>
			  		<td>P/E</td>
			  		<td>{_display(stockDetail.PERatio)}</td>
			  		<td>YEILD</td>
			  		<td>{_display(stockDetail.DividendYield)}</td>
			  	</tr>
			  </table>
		</div>
);

var _display = (field)=>(
  field && field.length > 1 ? field : '-'
);

export default StockDetails;