var server = require('./server');
var router = require('./router');
var fs 	   = require('fs');
var requestHandlers = require("./requestHandlers");
var handle = {}
handle['/'] = requestHandlers.start;
handle['/start'] = requestHandlers.start;
handle['/upload']= requestHandlers.upload;
fs.exists('/zqdmy',function(exists){
	if(!exists){
    	fs.mkdir('/zqdmy',function(err){
        	console.log(err+"zqdmy")
        	server.exstart(router.appRoute,handle);
        })
    }
})
