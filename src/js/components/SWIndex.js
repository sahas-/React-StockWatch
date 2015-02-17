/** @jsx React.DOM */
var React = require('react');
var AppStore = require ('../stores/SWStore.js');
var AppActions = require('../actions/SWActions.js');



function getIndices(symbol){
    return{
    indexData:AppStore.getIndices(symbol)
    }
}

var SWIndexLabel =
  React.createClass({ 

    render:function(){
      return(
        <label key={this.props.symbol} 
              className="metro-tile metro-tile-small metro-tile-green">
              {this.props.item.e}<br/>{this.props.item.l}, {this.props.item.c}
        </label>
      )
    }
  });
module.exports=SWIndexLabel;

var SWIndex =
  React.createClass({
    propTypes: {
        symbol:React.PropTypes.string.isRequired,
      },   
    getInitialState:function(){
      AppActions.getIndices(this.props.symbol);
      return getIndices(this.props.symbol);
      },
    _onChange:function(){
      this.setState(getIndices(this.props.symbol));
      },
    componentWillMount:function(){
      AppStore.addChangeListener(this._onChange);
      },
    render:function(){         
        if(this.state.indexData.length==0){
          return (<label>"no data"</label>);
        }
        else{
        return(
         <span>
          {this.state.indexData.map(function(item){
          console.log(item);
          return <SWIndexLabel item={item}/>;
          },this)}
         </span>
         )
        }
      }
});
module.exports = SWIndex;
