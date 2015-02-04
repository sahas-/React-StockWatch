/** @jsx React.DOM */

var React = require('react');
var SWGetSymbol = require('./SWGetSymbol');
var SWList = require('./SWList');
var StockWatchApp =
  React.createClass({
    render:function(){
      return (
          <div>
          <h4>Search</h4>
        	<SWGetSymbol />
          <br/>
          <SWList />
          </div>
      	)
    }
  });


module.exports = StockWatchApp;