/** @jsx React.DOM */

var React = require('react');
var AppStore = require ('../stores/SWStore.js');
var AppActions = require('../actions/SWActions.js');
var TimeTicker = require('./utils/TimeTicker');
var AlertTicker = require('./utils/AlertTicker');

function getStockList(){
	return{
		items:AppStore.getStockList()}
}

var SWListItem = React.createClass({
	propTypes: {
		id:React.PropTypes.string.isRequired,
		symbol:React.PropTypes.string.isRequired,
		lastPrice:React.PropTypes.string.isRequired,
		change:React.PropTypes.string.isRequired,
		start:React.PropTypes.any.isRequired,
	},

	handleClick: function(){
		this.props.onStockSelected(this.props.symbol);
	},


    handleIntervalReached:function(symbol){
      AppActions.updateSymbol(symbol);
    },

    handleOnScreenAlert: function(symbol){
    	AppActions.updateOnScreenAlert(symbol);
    },

	render: function(){
		return (
		<tr key={this.props.id}>
            <td className="iconCol"><i className="fa fa-trash-o"></i></td>
        	<td onClick={this.handleClick}>{this.props.symbol}</td>
        	<td>{this.props.lastPrice}</td>
        	<td className={this.props.change>0?'success':'danger'}>{this.props.change}</td> 
    		<TimeTicker 
    			symbol={this.props.symbol}         	
    			pollInterval={10000}
    			OnInterval={this.handleIntervalReached} />
    		<AlertTicker
    			symbol={this.props.symbol}
    			showAlert={this.props.showAlert}
    			alertInterval={5000}
    			OnScreenAlert={this.handleOnScreenAlert} />
		</tr>
        )
	}
});


var SWList = React.createClass({

    getInitialState:function(){
    	return getStockList();
    },
    componentWillMount:function(){
      AppStore.addChangeListener(this._onChange);
    },
    _onChange:function(){
      this.setState(getStockList());
    },
    handleStockSelected: function(item){
    	console.log("received the event @ parent for symbol: "+item);
    },
	render: function() {
		return(
			<div className="panel panel-default col-md-6">
			  <div className="panel-heading"><b>List</b></div>
			  <table className="table table-hover table-responsive col-md-6">
			    <thead>
				    <tr>
                        <th className="iconCol"></th>
                		<th>Symbol</th>
                		<th>Last Price ($)</th>
                		<th>Change ($)</th>
                		<th className="iconCol"></th>
                		<tbody>
							{this.state.items.map(function(item){
								return <SWListItem onStockSelected={this.handleStockSelected} 
								key={item.id} 
								id={item.id} 
								symbol={item.t}
								lastPrice={item.l}
								change={item.c}
								start={new Date()}
								showAlert={item.showAlert}/>;
							},this)}

            			</tbody>
              		</tr>
            		</thead>
			  </table>
			</div>
		)}
});

module.exports = SWList;