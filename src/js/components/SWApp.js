/** @jsx React.DOM */

var React = require('react');
var SWGetSymbol = require('./SWGetSymbol');
var SWCategorizedList = require('./SWList');
var SWIndex=require('./SWIndex');
var SWInstantSearch = require('./SWInstantSearch');


var libraries = [
    { name: 'Backbone.js', url: 'http://documentcloud.github.io/backbone/'},
    { name: 'AngularJS', url: 'https://angularjs.org/'},
    { name: 'jQuery', url: 'http://jquery.com/'},
    { name: 'Prototype', url: 'http://www.prototypejs.org/'},
    { name: 'React', url: 'http://facebook.github.io/react/'},
    { name: 'Ember', url: 'http://emberjs.com/'},
    { name: 'Knockout.js', url: 'http://knockoutjs.com/'},
    { name: 'Dojo', url: 'http://dojotoolkit.org/'},
    { name: 'Mootools', url: 'http://mootools.net/'},
    { name: 'Underscore', url: 'http://documentcloud.github.io/underscore/'},
    { name: 'Lodash', url: 'http://lodash.com/'},
    { name: 'Moment', url: 'http://momentjs.com/'},
    { name: 'Express', url: 'http://expressjs.com/'},
    { name: 'Koa', url: 'http://koajs.com/'},
];

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