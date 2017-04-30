import React from 'react';
import ReactDOM from 'react-dom';
import StockList from './components/StockList.jsx';
import StockDetails from './components/StockDetails.jsx';
import AddStock from './components/AddStock.jsx';


window.jQuery = window.$ = require('jquery');


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
		$.get('http://127.0.0.1:1128/stocks', function(response){
			console.log("response from server", response);
		})
		this.refreshData();

	}

	refreshData(){
		var url = 'https://query.yahooapis.com/v1/public/yql?q=select%20%2a%20from%20yahoo.finance.quotes%20where%20symbol%20in%20%28%22' + this.state.stockInput.toString() + '%22%29&env=store://datatables.org/alltableswithkeys&format=json';
		var context = this;
		$.get(url, function(response){
			var stocklist = response.query.results.quote;
			context.setState({
				stocks: stocklist,
				selectedStock:stocklist[1]
				});
		});
		
	} 

	handleStockEntryListClick(stock){
		this.setState({
			selectedStock: stock
		});
	}

	updateNewStock(stock){
		var newStocks = this.state.stocks;
		var newStockInput = this.state.stockInput;

		newStocks.push(stock);
		newStockInput.push(stock.Name);

		this.setState({
			stocks: newStocks,
			stockInput: newStockInput
		});
	}

	removeStock(stockName){
		console.log('stockData - Remove Stock', this.state.term);
		var newStocks = context.state.stocks;
		var newStockInput = context.state.stockInput;
		var index = newStockInput.indexOf(stockName);
		if(	index !== -1){
			newStocks.splice(index, 1);
			newStockInput.splice(index, 1);
		}
		this.setState({
			stocks: newStocks,
			stockInput: newStockInput
		});
	}
  
  render(){
    return(
    	<div>
	    	<h1>Stock Watchlist</h1>
	    	<div className="addStocks">
				<AddStock updateStock={this.updateNewStock.bind(this)}/>
	    	</div>
	    	<div className="stockListContainer">
	    		<StockList stocks = {this.state.stocks} stockEntryListClick = {this.handleStockEntryListClick.bind(this)} stockEntryListRemove = {this.removeStock.bind(this)}/>
	    	</div>
	    	<div className="stockDetailsContainer">
	    		<StockDetails stockDetail = {this.state.selectedStock}/>
	    	</div>
    	</div>);
  }
}
var stocks = ['AAPL','GOOG', 'FB', 'NFLX', 'TWTR', 'MSFT', 'SNAP'];

ReactDOM.render( <App stocks = {stocks}/>, document.getElementById("app"));