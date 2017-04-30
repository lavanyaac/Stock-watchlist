import React from 'react';
import $ from 'jquery';


class AddStock extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			term: ''
		}
	}

	onChange(e){
		$('.invalidStock').addClass('hidden');
		this.setState({
			term: e.target.value
		});
	}

	addStock(){
		var url = 'https://query.yahooapis.com/v1/public/yql?q=select%20%2a%20from%20yahoo.finance.quotes%20where%20symbol%20in%20%28%22' + this.state.term.toUpperCase() + '%22%29&env=store://datatables.org/alltableswithkeys&format=json';
		var context = this;
		$.get(url, function(response){
			var stock = response.query.results.quote;
			if(stock && stock.LastTradePriceOnly){
				context.props.updateStock(stock);
				context.setState({
					term: ''
				});
			}else{
				$('.invalidStock').removeClass('hidden');
			}
		});
	}

	render(){
		return(
			<div>
		        <input type="text" name="stockadd" value={this.state.term} onChange={this.onChange.bind(this)}/>
		        <input type="button" value="Add Stock" onClick={this.addStock.bind(this)}/>
		        <div className="invalidStock hidden">- This is not a valid stock symbol</div>
	        </div>
		);
	}
}

export default AddStock;