var request = require('request');

var GetSymbol = function(index,item,cb){
var result=[];
request({
	method:'get',
	url:'http://finance.google.com/finance/info?q='+index+':'+item}, 
	function (error, response, body) {
		if (error){
			result=error;
		}
		else if (response.statusCode == 200) {
			body = body.replace('//','');
			result = JSON.parse(body);
		}
		else{
			result =response.statusCode; 
		}
		cb(result);
  });	
};

module.exports.GetSymbol = GetSymbol;

var GetSymbolMatchingName = function(index,symbol,cb){
var result=[];
request({
	method:'get',
	url:'https://www.google.com/finance/match?matchtype=matchall&q='+index+':'+symbol}, 
	function (error, response, body) {
		if (error){
			result=error;
		}
		else if (response.statusCode == 200) {
			result = JSON.parse(body);
			result= result.matches[0].n;
		}
		else{
			result =response.statusCode; 
		}
		cb(result);
  });		
};
module.exports.GetSymbolMatchingName = GetSymbolMatchingName;