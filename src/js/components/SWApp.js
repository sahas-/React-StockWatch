/** @jsx React.DOM */

var React = require('react');
var SWGetSymbol = require('./SWGetSymbol');
var SWList = require('./SWList');
var SWIndex=require('./SWIndex');

var StockWatchApp =
  React.createClass({
    render:function(){
      return (
          <div>
          <SWIndex symbol=".inx"/>
          <SWIndex symbol=".ixic"/>        	
          <SWIndex symbol=".dji"/>    
          <SWGetSymbol />
          <SWList />
          </div>
      	)
    }
  });


module.exports = StockWatchApp;