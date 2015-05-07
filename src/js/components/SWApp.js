/** @jsx React.DOM */

var React = require('react');
var SWGetSymbol = require('./SWGetSymbol');
var SWCategorizedList = require('./SWList');
var SWIndex=require('./SWIndex');
var SWInstantSearch = require('./SWInstantSearch');


var StockWatchApp =
  React.createClass({
    render:function(){
      return (
          <div>
            <SWIndex /> 
            <SWGetSymbol />
            <SWInstantSearch />
            <SWCategorizedList />
          </div>
      	)
    }
  });


module.exports = StockWatchApp;