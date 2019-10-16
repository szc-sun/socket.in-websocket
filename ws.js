var http = require("http");
var WebSocket = require("ws");
var fs = require("fs");

//创建http服务
var httpServer = http.createServer(function(req,res){
	var url = req.url;
	fs.readFile("www"+url,function(err,data){
		if(err){
			res.end("404");
		} else {
			res.end(data);	
		}
	});
		
});

httpServer.listen(9000);

//创建websockt服务

var wss = new WebSocket.Server({ server:httpServer });
 
wss.on('connection', function connection(ws) {
	  console.log("wsServer");
	  //发送 send
	  ws.send("server--->client");
	  
	  //接收
	  ws.on('message', function(message) {
		  
		  console.log(message);
		  
		  //ws.send(message);
		  //广播
		  wss.clients.forEach(function(client) {
			if (client.readyState === WebSocket.OPEN) {
			  client.send(message);
			}
		  });
					  
		  
	  }); 
});





















