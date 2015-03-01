var underscore = require('underscore');

var getStockListWithFilterCriteria= function(_stocklist, searchString){
	return underscore.filter(_stocklist,function(item){
		return (item.t.toLowerCase().match(searchString));
	});
};
module.exports.getStockListWithFilterCriteria=getStockListWithFilterCriteria;