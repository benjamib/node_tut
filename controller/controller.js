const http = require("http");
const url = require("url");

module.exports = http.createServer((req,res) => {
	var service = require("../service/service.js");
	const reqUrl = url.parse(req.url,true);

	if(reqUrl.pathname == '/sample' && req.method === 'GET'){
		service.sampleRequest(req,res);
	} else if(reqUrl.pathname== '/look' && req.method === 'GET'){
	  service.look(req,res);
	} else if(reqUrl.pathname == '/test' && req.method === 'POST'){
		service.testRequest(req,res);
	} else if(reqUrl.pathname== '/move' && req.method === 'GET'){
	  service.move(req,res);
	} else if((reqUrl.pathname== '/whereami'|| reqUrl.pathname=='/where') && req.method === 'GET'){
	  service.where(req,res);
	}else if(reqUrl.pathname== '/whoami' && req.method === 'GET'){
	  service.whoami(req,res);
	}else if(reqUrl.pathname== '/sam' && req.method === 'GET'){
	  service.SAM(req,res);
	}else if(reqUrl.pathname== '/help' && req.method === 'GET'){
	  service.help(req,res);
	}else if(reqUrl.pathname== '/ship' && req.method === 'GET'){
	  service.ship(req,res);
	}else if(reqUrl.pathname== '/log' && req.method === 'GET'){
	  service.log(req,res);
	}else if(reqUrl.pathname== '/read' && req.method === 'GET'){
	  service.read(req,res);
	} else if(req.method === 'GET'){
		service.serveFile(req, res);
	} else{
		service.invalidRequest( req, res);
	}
	logRequest(req,reqUrl);
});

function logRequest(req,reqUrl){
	console.log('Request Type: ' + req.method + ' EndPoint: ' + reqUrl.pathname);
}
