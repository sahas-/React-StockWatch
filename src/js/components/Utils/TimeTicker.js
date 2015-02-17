/** @jsx React.DOM */

var React = require('react');
var _pollRegistry = [];


var TimeTicker = React.createClass({
    propTypes: {
        symbol:React.PropTypes.string.isRequired,
        pollInterval: React.PropTypes.number.isRequired,
    },

    isInPollRegistry: function(array, search){
        return (array.indexOf(search) >= 0) ? true : false; 
    },

    updatePollRegistry: function(symbol,action){
        if(!this.isInPollRegistry(_pollRegistry,symbol)){
            if(action=="add")
                var length=_pollRegistry.push({'symbol': symbol, 'start': Date.now()});
            if (action=="update"){
                _pollRegistry.map(function(item){
                    item.symbol==symbol?item.start=Date.now():item.start=item.start;
                });
            }
        }
    },

    isTimeForNewPoll: function(symbol,cb){
        var self=this;
        _pollRegistry.map(function(item){
            var isCorrectSymbol=item.symbol==symbol?true:false;
            var timeCheck=(Date.now()-item.start)>=self.props.pollInterval?true:false;
            cb(symbol,isCorrectSymbol&&timeCheck);
        });
    },

    handlePoll: function(symbol,poll){
        var self=this;
        if(poll){
            self.updatePollRegistry(this.props.symbol,'update');
            self.props.OnInterval(
                self.props.symbol
            );
        }
        else{
            //console.log('not time for another poll:'+symbol);
        }

    },

    handleInterval: function(symbol) {
        this.isTimeForNewPoll(symbol,this.handlePoll);
    },

    componentDidMount: function(){
        var self = this;
        self.updatePollRegistry(this.props.symbol,'add');
        self.timer = setInterval(function() {
                self.handleInterval(self.props.symbol);
                }, this.props.pollInterval);
    },

    componentWillUnmount: function(){
        clearInterval(this.timer);
    },


    render: function() {
        return (<span />);
    }
});

module.exports = TimeTicker;

