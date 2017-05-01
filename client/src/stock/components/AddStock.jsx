import React from 'react';
import $ from 'jquery';


class AddStock extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			term: ''
		}
	}

	componentDidMount(){
		$(".addStockLink").click(function(){
			$('#myModal').modal();  
		});
	}

	onChange(e){
		$('.invalidStock').addClass('hidden');
		this.setState({
			term: e.target.value
		});
	}

	saveStock(){
		$.post('http://127.0.0.1:1128/stocks/add', {stock: this.state.term.toUpperCase()}, function(response){
			console.log(response)
		});
	}

	addStock(){
		var url = 'https://query.yahooapis.com/v1/public/yql?q=select%20%2a%20from%20yahoo.finance.quotes%20where%20symbol%20in%20%28%22' + this.state.term.toUpperCase() + '%22%29&env=store://datatables.org/alltableswithkeys&format=json';
		var context = this;
		$.get(url, function(response){
			var stock = response.query.results.quote;
			if(stock && stock.LastTradePriceOnly){
				context.props.updateStock(stock);
				context.saveStock(context.state.term.toUpperCase());
				context.setState({
					term: ''
				});
				$('#myModal').modal('toggle');
			}else{
				$('.invalidStock').removeClass('hidden');
			}
		});
	}

	render(){
		return(
			<div>
				<div className="addStockContainer">
				<a href="javascript:void(0)" className="addStockLink">+ Add Stock</a>
				</div>
					<div id ="myModal" className="modal fade" tabindex="-1" role="dialog">
					  <div className="modal-dialog" role="document">
					    <div className="modal-content">
					      <div className="modal-header">
					        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					        <h4 className="modal-title">Add Stock</h4>
					      </div>
					      <div className="modal-body">
					Add Stock:     <input type="text" name="stockadd" value={this.state.term} onChange={this.onChange.bind(this)} />
					 <div className="invalidStock hidden">- This is not a valid stock symbol</div>
					      </div>
					      <div className="modal-footer">
					        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
					        <button type="button" className="btn btn-primary" onClick={this.addStock.bind(this)}> Add Stock</button>
					      </div>
					    </div>
					  </div>
					</div>
	        </div>
		);
	}
}

export default AddStock;