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
	
	//接收数据
	socket.on("msg",function(data){
		console.log(data);	
		
		//发送数据广播
		socket.broadcast.emit("msg_all",data);
	});	
});























