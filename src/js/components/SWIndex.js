/** @jsx React.DOM */
var React = require('react');
var AppStore = require ('../stores/SWStore.js');
var AppActions = require('../actions/SWActions.js');
var indexFrndlyName={"INDEXDJX":"DOW","INDEXNASDAQ":"NASDAQ","INDEXSP":"S&P 500"}

function getIndices(){
    return{
    indexData:AppStore.getIndices()
    }
}

var ObjectRow =
  React.createClass({

  render:function(){
    return(
      <label key={this.props.item.id} className={this.props.item.c>0?'metro-tile metro-tile-small metro-tile-green':'metro-tile metro-tile-small metro-tile-red'}>
      {indexFrndlyName[this.props.item.e]}<br/>{this.props.item.l}, {this.props.item.c}
      </label>
      )}
  });

module.exports=ObjectRow;

var SWIndex =
  React.createClass({
   
    getInitialState:function(){
      AppActions.getIndices();
      return getIndices();
      },
    _onChange:function(){
        getIndices();
        if(this.state.indexData.length==3){
          this.setState(getIndices());
        }
      },
    componentWillMount:function(){
      AppStore.addChangeListener(this._onChange);
      },
    render:function(){ 
        if(typeof this.state.indexData === 'undefined' || (this.state.indexData=='') || (this.state.indexData==null)){
          return (<label>"no data yet"</label>);
        }
        else{
          var rows = [];
          this.state.indexData.map(function(rowItem){
            rows.push(<ObjectRow item={rowItem}/>);
          })
          return (<div>{rows}</div>)
        }
        }
});
module.exports = SWIndex;
