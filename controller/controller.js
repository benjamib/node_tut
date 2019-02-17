const http = require("http");
const url = require("url");

module.exports = http.createServer((req,res) => {
	var service = require("../service/service.js");
	const reqUrl = url.parse(req.url,true);

	if(reqUrl.pathname == '/sample' && req.method === 'GET'){
		service.sampleRequest(req,res);
	} else if(reqUrl.pathname == '/test' && req.method === 'POST'){
		service.testRequest(req,res);
	} else if(req.method === 'GET'){
		service.serveFile(req, res);
	} else{
		service.invalidRequest( req, res);
	}
	logRequest(req,reqUrl);
});

function logRequest(req,reqUrl){
	console.log('Request Type: ' + req.method + ' EndPoint: ' + reqUrl.pathname);
};
