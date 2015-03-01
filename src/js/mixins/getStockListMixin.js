var AppStore = require ('../stores/SWStore.js');

function getStockList(){
return{
	items:AppStore.getStockList()}
    };
module.exports = getStockList;