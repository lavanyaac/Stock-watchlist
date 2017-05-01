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
	    	stockInput: [],
	    	stocks:[] ,
	    	selectedStock: '',
	    	refresh: this.props.refresh || false
	    		    }
   	}

	componentWillMount() {
		this.refreshData();
	}

	 componentDidMount() {
	    var context=this;
	    if(this.state.refresh){
	      setTimeout(function(){
	        context.refreshData()}
	                 ,20000);
	    }
	  }

	refreshData(){
		var context = this;
		$.get('http://127.0.0.1:1128/stocks', function(response){
			context.setState({
				stockInput: JSON.parse(response)
			});
			context.getStockInfo();
		});	

	}

	getStockInfo(){
		var url = 'https://query.yahooapis.com/v1/public/yql?q=select%20%2a%20from%20yahoo.finance.quotes%20where%20symbol%20in%20%28%22' + this.state.stockInput.toString() + '%22%29&env=store://datatables.org/alltableswithkeys&format=json';
		var context = this;
		$.get(url, function(response){
			var stocklist = [].concat(response.query.results.quote);
			context.setState({
				stocks: stocklist,
				selectedStock:stocklist[0]
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
		var context = this;
		$.ajax({
		    url: 'http://127.0.0.1:1128/stocks',
		    type: 'DELETE',
		    data: {stock: stockName},
		    success: function(result) {
		        context.refreshData()
		    }
		});
	}
  
  render(){
    return(
    	<div>
    		<div className="header">
    		<div>Stock Watch List</div>
    		</div>
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

ReactDOM.render(<App refresh={true}/>,document.getElementById('app'));