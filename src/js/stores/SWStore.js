var AppDispatcher = require('../dispatchers/AppDispatcher');
var AppConstants = require('../constants/SWConstants');
var merge =require('react/lib/merge');
var EventEmitter = require('events').EventEmitter;
var SymbolStore = require('./SWGetSymbolStore');
var underscore = require('underscore');

var CHANGE_EVENT="change";

var _stockitems = [];
var _inList=[];
var _indices=[];

var AppStore = merge(EventEmitter.prototype, {
	emitChange: function(){
		this.emit(CHANGE_EVENT);
		},
    /**
    * @param {function} callback
    */
    addChangeListener: function(callback) {
    	this.on(CHANGE_EVENT,callback);
  		},
    /**
    * @param {function} callback
    */
    removeChangeListener: function(callback) {
    	this.removeListener(CHANGE_EVENT, callback);
    	},

	getStockList: function(callback){
		return underscore.groupBy(_stockitems,'category');
		},

	getIndices: function(callback){
		return _indices;
		},

	getInList: function(callback){
		return _inList;
		},

	dispatcherIndex:AppDispatcher.register(function(payload){
		var action = payload.action;
		switch (action.actionType){
			case AppConstants.GET_SYMBOL:
				if(_inList.indexOf(payload.action.item) == -1){
				SymbolStore.GetSymbol("NASDAQ",payload.action.item, function(result){
				if (result.length !=1){
					console.log('something wrong - get symbol failed !!');
				}
				else{
					_inList.push(payload.action.item);
					result[0].showAlert=false;
					SymbolStore.GetSymbolMatchingName("NASDAQ",payload.action.item,function(name){
						result[0].name=name;
						result[0].category='category ' + underscore.random(1,4);
						_stockitems.push(result[0]);
        				AppStore.emitChange();
					});
				}
				});
				}
				break;

			case AppConstants.UPDATE_SYMBOL:
				SymbolStore.GetSymbol("NASDAQ",payload.action.item, function(result){
				if (result.length !=1){
					console.log('something wrong - get symbol failed !!');
				}
				else{
					_stockitems.map(function(item){
						if(result[0].t == item.t){
							item.l=result[0].l;//Math.random()*Math.random()*4;
							item.c=result[0].c;//Math.random();//result[0].c;
							item.showAlert=true;
						}
					});
					AppStore.emitChange();
				}
				});
				break;

			case AppConstants.ONSCREEN_ALERT:
				_stockitems.map(function(item){
					if(payload.action.item == item.t){
						item.showAlert=false;
					}
				});
				AppStore.emitChange();
				break;


			case AppConstants.GET_INDEX:
				var _INDICES=['.inx','.ixic','.dji'];
				_INDICES.forEach(function(myindex){
					SymbolStore.GetSymbol("NASDAQ",myindex, function(result){
					if (result.length !=1){
						console.log('something wrong - get symbol failed !!');
					}
					else{
						_indices.push(result[0]);
						AppStore.emitChange();
						}
					});
				})
				break;				

		return true;
		}

})
});

module.exports = AppStore;



