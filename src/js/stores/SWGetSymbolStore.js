var request = require('request');

var GetSymbol = function(item,cb){
var result=[];
request({
	method:'get',
	url:'http://finance.google.com/finance/info?q=NYSE:'+item}, 
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

module.exports = GetSymbol;
