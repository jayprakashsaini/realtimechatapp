const express = require('express');
const { Socket } = require('net');
const path = require('path');
const app = express();
const server  = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname,"../")))

app.get('/',(req,res)=>{
    // res.send('hello world');
    res.sendFile(path.join(__dirname,'index.html'))
    // res.status(303).render(path.join(__dirname,'../index.html'));
})
var users= {};
io.on('connection',socket=>{
    socket.on('user-joined',name=>{
        users[socket.id]=name;
        socket.broadcast.emit('new-user',name);
        // console.log("new user",name);
    })
    socket.on('send',message=>{
        socket.broadcast.emit('recieve',{message:message,name:users[socket.id]})
    })
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    })
})

// app.listen(800,()=>{
//     console.log("server is started")
// })
server.listen(600);