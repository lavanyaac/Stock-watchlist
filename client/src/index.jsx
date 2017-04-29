import React from 'react';
import ReactDOM from 'react-dom';
import StockList from './components/StockList.jsx';
import StockDetails from './components/StockDetails.jsx';
import $ from 'jquery';

class App extends React.Component {
  	constructor(props) {
	    super(props);
	    this.state ={
	    	stockInput: this.props.stocks,
	    	stocks:[] ,
	    	selectedStock: '',
	    	term: ''
	    }
   	}

	componentWillMount() {
		console.log(' component did mount')
		this.refreshData();
	}

	refreshData(){
		console.log(' refresh data')
		var url = 'https://query.yahooapis.com/v1/public/yql?q=select%20%2a%20from%20yahoo.finance.quotes%20where%20symbol%20in%20%28%22' + this.state.stockInput.toString() + '%22%29&env=store://datatables.org/alltableswithkeys&format=json';
		var context = this;
		$.get(url, function(response){
			var stocklist = response.query.results.quote;
			context.setState({
				stocks: stocklist,
				selectedStock:stocklist[1]
				});
		});
		// $.get('http://127.0.0.1:1128/stocks', function(response){
		// 	console.log("response from server", response);
		// })
	} 

	handleStockEntryListClick(stock){
		console.log("clicked", stock)
		this.setState({
			selectedStock: stock
		});
		console.log("clicked2", stock);
	}

	onChange(e){
		$('.invalidStock').addClass('hidden');
		console.log("input value", e.target.value)
		this.setState({
			term: e.target.value
		});
	}

	addStock(){
		console.log('stockData - Add Stock', this.state.term);
		var url = 'https://query.yahooapis.com/v1/public/yql?q=select%20%2a%20from%20yahoo.finance.quotes%20where%20symbol%20in%20%28%22' + this.state.term.toUpperCase() + '%22%29&env=store://datatables.org/alltableswithkeys&format=json';
		var context = this;
		$.get(url, function(response){
			var stock = response.query.results.quote;
			if(stock && stock.LastTradePriceOnly){
				var newStocks = context.state.stocks;
				var newStockInput = context.state.stockInput;

				newStocks.push(stock)
				newStockInput.push(context.state.term)

				context.setState({
					stocks: newStocks,
					stockInput: newStockInput,
					term: ''

				});
			}else{
				$('.invalidStock').removeClass('hidden');
			}
		});
	}

	removeStock(){
		console.log('stockData - Remove Stock', this.state.term);

	}
  
  render(){
    return(
    	<div>
	    	<h1>Stock Watchlist</h1>
	    	<form>
				<input type="text" name="stockadd" value={this.state.term} onChange={this.onChange.bind(this)}/>
				<input type="button" value="Add Stock" onClick={this.addStock.bind(this)}/>
				<div className="invalidStock hidden">- This is not a valid stock symbol</div>
	    	</form>
			
	    	<div className="stockListContainer">
	    		<StockList stocks = {this.state.stocks} stockEntryListClick = {this.handleStockEntryListClick.bind(this)}/>
	    	</div>
	    	<div className="stockDetailsContainer">
	    		<StockDetails stockDetail = {this.state.selectedStock}/>
	    	</div>
    	</div>);
  }
}
var stocks = ['AAPL','GOOG', 'FB', 'NFLX', 'TWTR', 'MSFT', 'SNAP'];

ReactDOM.render( <App stocks = {stocks}/>, document.getElementById("app"));