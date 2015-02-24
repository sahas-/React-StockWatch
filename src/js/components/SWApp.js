/** @jsx React.DOM */

var React = require('react');
var SWGetSymbol = require('./SWGetSymbol');
var SWCategorizedList = require('./SWList');
var SWIndex=require('./SWIndex');
//var SWFavCloud = require('./SWFavCloud');

var StockWatchApp =
  React.createClass({
    render:function(){
      return (
          <div>
            <SWIndex /> 
            <SWGetSymbol />
            <SWCategorizedList />
          </div>
      	)
    }
  });


module.exports = StockWatchApp;