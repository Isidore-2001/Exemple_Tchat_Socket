const express = require('express');
var crypto = require('crypto'); 
const app = express();

const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');

let users = {};
const io = new Server(server);


app.get('/', (req, res) => {
    res.sendFile(__dirname +'/index.html')
});


app.get('/css/style.css', function(req, res) {
	res.sendFile(__dirname + "/css/" + "style.css");
  });

  app.get('/css/bg.png', function(req, res) {
	res.sendFile(__dirname + "/css/" + "bg.png");
  });

  app.get('/css/wood.jpg', function(req, res) {
	res.sendFile(__dirname + "/css/" + "wood.jpg");
  });

  app.get('/js/client.js', function(req, res) {
	res.sendFile(__dirname + "/js/" + "client.js");
  });
  

  app.get('/js/mustache.js', function(req, res) {
	res.sendFile(__dirname + "/js/" + "mustache.js");
  });
  

io.on('connection', (socket)=>{

  var me = false;
  

  socket.on('login', function(user){
    

    
    
    for (let k in users){
      socket.emit('newusr', users[k])
    };  
    

    
    me = user;
		me.id = crypto.createHash('md5').update(user.mail)
		me.avatar = 'https://gravatar.com/avatar/' + crypto.createHash('md5').update(user.mail).digest('hex') + '?s=50'
    me.mail = user.mail; 
    io.sockets.emit('newusr', me);
    users[me.mail] = me;
    socket.emit('logged', me);
    //console.log(users);
  }

  
  
  
  
  );
  socket.on('disconnect', ()=>{
    
    if(!me){
      return false;
    }
    else{
      delete users[me.mail];
      io.sockets.emit('discusr', me);
    }
    console.log(users)
  }
  
  
  )


  socket.on('message', (message)=>{
    //console.log(message);
    if(message.length === 0){
      return false;
    }
    else{
      message.user = me;
      date = new Date();
      message.h = date.getHours();
      message.m  =date.getMinutes();
      //message = message.message;
      
    }
    //console.log(message);
    io.sockets.emit('message', message);
    console.log(message);
  })

  
 
    
})




server.listen(3000);