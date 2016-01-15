var express = require('express');
var app = express();
app.get('/',function(req,res){
  res.status(200).send('欢迎来到汇智网学习！');
});
app.get('/index',function(req,res){
   res.sendFile('index.html',{root:__dirname});
});
app.get('/socket.io.js',function(req,res){
   res.sendFile('socket.io.js',{root:__dirname});
});
var server = require('http').createServer(app);
var io = require('socket.io')(server);
io.on('connection',function(socket){
          console.log("io---connect");
          socket.on('disconnect',function(){
         	console.log("io---disconnect");
     });

});
server.listen(8080);