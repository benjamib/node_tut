const url= require("url");
const fs = require("fs");
const path = require("path");

const dt = require("../html/data");

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

exports.look = function (req,res){
  const reqUrl = url.parse(req.url,true);
	var param = "around";
  if(reqUrl.query.param !== 'undefined'){
		param = reqUrl.query.param;
	}
	var response = handleLook(param);
	sendResponse(res,response);
	
};
function handleLook(direction)
{
  if(direction === "around"){
    return dt.CurrentLocation().look;
  }
  else if(direction === "north"){
    return dt.CurrentLocation().lookNorth();
  }
  else if(direction === "south"){
    return dt.CurrentLocation().lookSouth();
  }
  else if(direction == "east"){
    return dt.CurrentLocation().lookEast();
  }
  else if(direction === "west"){
    return dt.CurrentLocation().lookWest();
  }
  else{
    return "I do not know how to look at " + direction;
  }
}
exports.move = function (req,res){
  const reqUrl = url.parse(req.url,true);
  if(reqUrl.query.param === 'undefined'){
		sendResponse(res,"Need to specify the direction you want to move (North/South/East/West)");
		return;
	}
	param = reqUrl.query.param;
	var response = handleMove(param);
	sendResponse(res,response);
};
function handleMove(direction){
  if(direction === "north"){
    return dt.MoveNorth();
  }
  else if(direction === "south"){
    return dt.MoveSouth();
  }
  else if(direction == "east"){
    return dt.MoveEast();
  }
  else if(direction === "west"){
    return dt.MoveWest();
  }
  else{
    return "I do not know how to move " + param;
  }
}
exports.read = function(req,res){
  const reqUrl = url.parse(req.url,true);
  if(reqUrl.query.param === 'undefined'){
		sendResponse(res,"Need to specify a log number");
		return;
	}
	param = reqUrl.query.param;
	var response = dt.ReadLog(param);
  sendResponse(res,response);
};
exports.where = function(req,res){
  var response = dt.GetLocation();
  sendResponse(res,response);
};
exports.whoami = function(req,res){
  var response = dt.GetWhoami();
  sendResponse(res,response);
};
exports.SAM = function(req,res){
  var response = dt.GetAboutSAM();
  sendResponse(res,response);
};
exports.help = function(req,res){
  var response = dt.GetHelp();
  sendResponse(res,response);
};
exports.ship = function(req,res){
  var response = dt.GetShip();
  sendResponse(res,response);
};
exports.log = function(req,res){
  var response = dt.DisplayLogs();
  sendResponse(res,response);
};
function sendResponse(res,response){
  res.statusCode = 200;
	res.setHeader('Content-Type','application/text');
	res.end(JSON.stringify(response));
}
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
		
		res.end(response);

	});
};


exports.invalidRequest = function (req, res) {
	res.statusCode = 404;
	res.setHeader('Content-Type', 'text/plain');
	res.end("Invalid Request");
};

exports.serveFile = function (req,res){
	var filepath = "html/" + req.url;
	if(req.url=="/") {
		filepath = "html/command-ui.html";
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
	contentType = mimeTypes[extname];
	if(contentType == null)
	{
		sendResponse(res,"I do not understand that command...");
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
