const url= require("url");
const fs = require("fs");
const path = require("path");

exports.sampleRequest = function (req,res) {
	const reqUrl = url.parse(req.url,true);
	var name = "World";
	if(reqUrl.query.name){
		name = reqUrl.query.name;
	}
	var response = {
		"text" : 'Hello ' + name
	};
	res.statusCode = 200;
	res.setHeader('Content-Type','application/json');
	res.end(JSON.stringify(response));
};

exports.testRequest = function (req,res) {
	body = '';

	req.on('data', function (chunk) {
		body +=chunk;
	});
	req.on('end' , function() {
	postBody = JSON.parse(body);
	console.log(postBody);
		var response = {
			"text" : "Post Request Value is " + postBody.value
		};
		res.statusCode =200;
		res.setHeader('Content-Type','application/json');
		res.end(JSON.stringify(response));

	});
};


exports.invalidRequest = function (req, res) {
	res.statusCode = 404;
	res.setHeader('Content-Type', 'text/plain');
	res.end("Invalid Request");
};

exports.getRepsForAddress = function (req,res) {
  
  
  const reqUrl = url.parse(req.url,true);
  var zip = reqUrl.query.zipCode;
  
  if(validateZip(zip) !== null) {
    res.statusCode = 200;
	  res.setHeader('Content-Type','application/json');
	  var response = { "zipcode" : + reqUrl.query.zipCode};
	  res.end(JSON.stringify(response));
  } else {
    this.invalidRequest(req,res);
  }
  
};

exports.serveFile = function (req,res){
	var filepath = "html/" + req.url;
	if(req.url=="/") {
		filepath = "html/index.html";
	}
	
	var extname = String(path.extname(filepath)).toLowerCase();
	var mimeTypes = {
		'.html' : 'text/html',
		'.js':'text/javascript',
		'.css':'text/css',
		'.json':'application/json',
		'.png':'image/png',
		'.jpg':'image/jpg',
		'.gif':'image/gif',
		'.wav':'audio/wav',
		'.mp4':'video/mp4',
		'.woff':'applicaiton/font-woff',
		'.ttf':'application/font-ttf',
		'.eot':'application/vnd.ms-fontobject',
		'.otf':'application/font-otf',
		'.svg':'application/image/svg+xml'

	};
	console.log(extname);
	contentType = mimeTypes[extname];
	console.log(contentType);
	if(contentType == null)
	{
	  console.log("here");
		res.writeHead(204);
		res.end();
	}
	else {
	  fs.readFile(filepath, function(err,content){
		if(err){
			if(err.code == 'ENOENT'){
				fs.readFile('./404.html',function(err,content){
					res.writeHead(200, {'Content-Type':contentType});
					res.end(content, 'utf-8');
				});
			}
			else {
				res.writeHead(500);
				res.end('FooBar ' + err.code);
				res.end();
			}
		}
		
		res.writeHead(200,{'Content-Type': contentType});
		res.end(content, 'utf-8');
	});
	}
};

function validateZip(zip){
  var zipRegex = /^\d{5}$/g;
  return zip.match(zipRegex);
}