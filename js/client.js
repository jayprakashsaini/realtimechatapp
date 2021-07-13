// const { Socket } = require('socket.io');
// const io = require('socket.io')(server);

const socket = io('/');

const form = document.getElementById('sendcontainer');
const messINP = document.getElementById('messageINP');
const messageCont = document.querySelector(".container");

const joinSound = new Audio('facebook_chat_2016.mp3');
const recSound = new Audio('whatsapp_tone1.mp3');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messINP.value ;
    append(`You :  ${message}`,'right');

    socket.emit('send',message);
    messINP.value = "";

});

const append =(message,pos)=>{
    const messEle = document.createElement('div');
    messEle.innerText = message;
    messEle.classList.add("message");
    messEle.classList.add(pos);
    messageCont.append(messEle);
}

const newAppend = (message,pos)=>{
    const newEle = document.createElement('div');
    newEle.innerText = message;
    newEle.classList.add(pos);
    messageCont.append(newEle);
}


let name = prompt('Enter your name to join');
socket.emit('user-joined',name);
// console.log(name);
socket.on('new-user',name=>{
    joinSound.play();
    newAppend(`${name} joined the chat`,'middle');
})

socket.on('recieve',data=>{
        recSound.play();
        append(`${data.name} :  ${data.message}`,'left')
})

// socket.emit('disconnect',)

socket.on('left',data=>{
    newAppend(`${data} has left the chat`,'middle');
})