/** @jsx React.DOM */
var React = require('react');
var getStockList = require('../mixins/getStockListMixin.js');
var AppStore = require ('../stores/SWStore.js');
var AppActions = require('../actions/SWActions.js');

var SWInstantSearch = React.createClass({
    mixins: [getStockList],


    getInitialState:function(){
    return {
        searchString:'',
        };
    },

    handleChange: function(searchFor){
        if(searchFor.target.value.length > 0){
            AppActions.filterSymbols(searchFor.target.value);
        }
        else
        {
            AppActions.resetSymbolsListToOriginal();
        }
        this.setState({searchString:searchFor.target.value});
    },


    render: function() {
        var searchString = this.state.searchString.trim().toLowerCase();
        return (<div>
                <input type="text" value={this.state.searchString} onChange={this.handleChange} placeholder="Filter text here" />
            </div>)
    }
});

module.exports = SWInstantSearch;