/** @jsx React.DOM */

var React = require('react');
var AppStore = require ('../stores/SWStore.js');
var AppActions = require('../actions/SWActions.js');
var TimeTicker = require('./utils/TimeTicker');
var AlertTicker = require('./utils/AlertTicker');
var underscore = require('underscore');


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
            <tr>
            <td className="iconCol">
                <br/>
                <i className="fa fa-trash-o"></i>
            </td>
        	<td className={this.props.change>0?'symbolCol changeCol-green':'symbolCol changeCol-red'} 
                onClick={this.handleClick}>
                <br/>
                {this.props.symbol}
                <br/>
                <AlertTicker
                   symbol={this.props.symbol}
                   showAlert={this.props.showAlert}
                   alertInterval={5000}
                   OnScreenAlert={this.handleOnScreenAlert} />                
            </td>
            <td className="nameCol">
                <small>{this.props.name}</small>           
                <br/><h3>{this.props.lastPrice},{this.props.change}</h3>
            </td>
		    <TimeTicker 
    			symbol={this.props.symbol}         	
    			pollInterval={10000}
    			OnInterval={this.handleIntervalReached} />
            </tr>
        )
	}
});

var SWCategorizedList = React.createClass({
    getInitialState:function(){
        return getStockList();
        },
    componentWillMount:function(){
        AppStore.addChangeListener(this._onChange);
        },
    _onChange:function(){
        this.setState(getStockList());
        },

    render: function(){
        if(typeof this.state.items === 'undefined' || (this.state.items==='') || (this.state.items===null)){
          return (<label>"no data yet"</label>);
        }
        else{
            var cat=[];

            for (var key in this.state.items) {
               var obj = this.state.items[key];
               cat.push(<h4 className="groupHeader">{key}</h4>);
               for (var prop in obj) {
                cat.push(<SWList item={obj[prop]}/>)
               }

            }

            return(<div>{cat}</div>);
        }
    }

});
module.exports = SWCategorizedList;

var SWList = React.createClass({

    handleStockSelected: function(item){
    	console.log("received the event @ parent for symbol: "+item);
    },
	render: function() {
		return(
			  <table className="table table-hover .col-xs-6.col-md-4">

                		<tbody>
								return <SWListItem onStockSelected={this.handleStockSelected} 
								key={this.props.item.id} 
								id={this.props.item.id} 
								symbol={this.props.item.t}
                                name={this.props.item.name}
								lastPrice={this.props.item.l}
								change={this.props.item.c}
								start={new Date()} 
                                showAlert={this.props.item.showAlert}/>;
            			</tbody>

			  </table>
		)}
});
