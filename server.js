var http = require("http");
var io = require("socket.io");
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

var ws = io(httpServer);

ws.on("connection",function(socket){
	console.log("wsServer");	
	
	//events  on("事件") emit("事件","数据")
	//数据交互 1 发送 2接收
	
	//发送
	socket.emit("test","server--->client");
	
	//接收
	
	socket.on("abc",function(data){
		console.log(data);	
	});
	
	
});























