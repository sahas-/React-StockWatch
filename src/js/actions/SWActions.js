var AppConstants =require('../constants/SWConstants');
var AppDispatcher = require('../dispatchers/AppDispatcher');

var AppActions={
	addItem:function(item){
		AppDispatcher.handleViewAction({
			actionType: AppConstants.ADD_ITEM,
			item: item
		})
	},
	getSymbol:function(item){
		AppDispatcher.handleViewAction({
			actionType:AppConstants.GET_SYMBOL,
			item:item
		})
	},
	getIndices:function(item){
		AppDispatcher.handleViewAction({
			actionType:AppConstants.GET_INDEX,
		})
	},

	updateSymbol:function(item){
		AppDispatcher.handleViewAction({
			actionType:AppConstants.UPDATE_SYMBOL,
			item:item
		})
	},
	updateOnScreenAlert:function(item){
		AppDispatcher.handleViewAction({
			actionType:AppConstants.ONSCREEN_ALERT,
			item:item
		})		
	},
	filterSymbols: function(item){
		AppDispatcher.handleViewAction({
			actionType: AppConstants.FILTER_SYMBOLSLIST,
			item:item
		})
	},
	resetSymbolsListToOriginal: function(){
		AppDispatcher.handleViewAction({
			actionType: AppConstants.RESET_SYMBOLSLIST
		})
	}
	
};
module.exports = AppActions;