/** @jsx React.DOM */
var React = require('react');
var AppStore = require ('../stores/SWStore.js');
var AppActions = require('../actions/SWActions.js');

var SWGetSymbol =
  React.createClass({
    handleClick:function(){
      AppActions.getSymbol(this.refs['txtsymbol'].getDOMNode().value);
    },
    render:function(){
      return (
        <div className="form-group input-group col-sm-7">
          <br/>
          <label>Search</label>
          <input ref='txtsymbol' 
            type="text" 
            className="input-medium search-query" 
            defaultValue="SBUX"
            tabIndex="1"></input>
          <button type="button" 
            className="btn" 
            tabIndex="2"
            onClick={this.handleClick}>Add</button>
        </div>
  	   );
    }
  });


module.exports = SWGetSymbol;

