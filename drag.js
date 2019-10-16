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

var arr = [];
ws.on("connection",function(socket){
	console.log("wsServer");
	
	arr.push(socket);
	
	//接收数据
	socket.on("pos",function(data){
		console.log(data);	
		
		//发送数据
		for(var i = 0; i < arr.length; i++){
			if(arr[i] == socket) continue;
			arr[i].emit("pos_msg",data);
		}
	});	
});























