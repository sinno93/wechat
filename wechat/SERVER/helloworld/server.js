var http = require('http');
var url  = require('url');
var fs   = require('fs');

function serverStart(route,handle){
	function onRequest(request,response){
		var postData = "";
		var pathname = url.parse(request.url).pathname;
		request.setEncoding("utf8");
		request.addListener("data",function(postDataChunk){
			postData += postDataChunk;
			console.log("Received Post data chunk "+postDataChunk);

		});
		request.addListener("end",function(){

			route(handle,pathname,response,postData);
		})
		
	}
	var server = http.createServer(onRequest);
	var io     = require('socket.io')(server);
	server.listen(8881)
	io.on('connection',function(){
	console.log("io----connection");
	socket.on('disconnect',function(){
		console.log("io----disconnect");
	})
})
	console.log("Server has started."+Date());
}
exports.exstart = serverStart;