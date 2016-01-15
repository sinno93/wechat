var exec = require("child_process").exec;
function start(response,postData){
	console.log("request handler 'start' was called.");
	var content = "empty";
	// exec("ls -lah",function(error,stdout,stderr){
	// 	var content = stdout;
	// 	response.writeHead(200,{"Content-Type":"text/plain"});
	// 	response.write(stdout);
	// 	response.end();
	// })
// exec("find /",
//     { timeout: 20000, maxBuffer: 20*2048 },
//     function (error, stdout, stderr) {
//       response.writeHead(200, {"Content-Type": "text/plain"});
//       response.write(stdout);
//       response.end();
//     });
var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '<script src="socket.io.js">'+'</script>'+
    '</head>'+
    '<body>'+
    '<form action="/upload" method="post">'+
    '<textarea name="text" rows="20" cols="60"></textarea>'+
    '<input type="submit" value="Submit text" />'+
    '</form>'+
    '</body>'+
    '</html>';
    // sleep(1000);
    var content = {
    	hello:"晓东",
    	bello:"iOS"
    }
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("{hello:'肖冬'}");
    response.end();
	
	
}
function upload(response,postData){
	console.log("request handler 'upload' was called");
	response.writeHead(200,{"Content-Type":"text/plain"});
		response.write("you post data:"+postData);
		response.end();
}

function sleep(milliSeconds){
	var startTime = new Date().getTime();
	while (new Date().getTime()<startTime + milliSeconds);
}
exports.start = start;
exports.upload = upload;