/** @jsx React.DOM */

var React = require('react');
var _alertRegistry = [];

//mixin??
var AlertTicker = React.createClass({
    propTypes: {
        symbol:React.PropTypes.string.isRequired,
        alertInterval: React.PropTypes.number.isRequired,
        showAlert: React.PropTypes.any.isRequired,
    },

    isInAlertRegistry: function(array, search){
        return (array.indexOf(search) >= 0) ? true : false; 
    },

    updateAlertRegistry: function(symbol,action){
        if(!this.isInAlertRegistry(_alertRegistry,symbol)){
            if(action=="add")
                var length=_alertRegistry.push({'symbol': symbol, 'start': Date.now()});
            if (action=="update"){
                _alertRegistry.map(function(item){
                    item.symbol==symbol?item.start=Date.now():item.start=item.start;
                });
            }
        }
    },

    isTimeForNewPoll: function(symbol,cb){
        var self=this;
        _alertRegistry.map(function(item){
            var isCorrectSymbol=item.symbol==symbol?true:false;
            var timeCheck=(Date.now()-item.start)>=self.props.alertInterval?true:false;
            cb(symbol,isCorrectSymbol&&timeCheck);
        });
    },

    handlePoll: function(symbol,poll){
        var self=this;
        if(poll){
            self.props.OnScreenAlert(
                self.props.symbol
            );
        }
        else{
            //console.log('not time for another onscreen alert'+symbol);
        }

    },

    handleInterval: function(symbol) {
        this.isTimeForNewPoll(symbol,this.handlePoll);
    },

    componentDidMount: function(){
        var self = this;
        self.updateAlertRegistry(this.props.symbol,'add');
        self.timer = setInterval(function() {
                self.handleInterval(self.props.symbol);
                }, this.props.alertInterval);
    },

    componentWillUnmount: function(){
        clearInterval(this.timer);
    },

    render: function() {

        return (<span><small>
            {this.props.showAlert?(<i className="fa fa-exclamation-triangle"></i>):(<i/>)}
            </small></span>);
    }
});

module.exports = AlertTicker;

