const express = require('express'),
      app = express(),
      http = require('http').createServer(app),
      io = require('socket.io')(http)
;
const host = '127.0.0.1';
const port = 7000;

let clients = [
    {
        id: "",
        user: "user1",
        password: "1111",
        room: "room1"
    },
    {
        id: "",
        user: "user2",
        password: "1111",
        room: "room2"
    },
    {
        id: "",
        user: "user3",
        password: "1111",
        room: "room1"
    },
    {
        id: "",
        user: "user4",
        password: "1111",
        room: "room2"
    }
];

io.on('connection', userConnection);

function userConnection(socket)
{
    socket.emit('message', {
        name: "server",
        message: "I am server"
    });
    socket.on('userAuth', getOptions); 
    socket.on('change-room', changeRoom);
    socket.on('message', sendMessage);
    socket.on('disconnect', disconnection);  
    socket.on('room-message', roomMessage); 
    socket.on('private-message', privateMessage); 
}

function sendMessage(message)
{
    //let answer = message.split("").reverse().join("");
    io.emit('message', message);    
}

function roomMessage(message)
{
    client = clients.find(item => item.id == this.id); 

    if (client) {
        roomMessage = {
            name: client.user,
            message: message
        };

        io.to(client.room).emit('message',roomMessage);
    }    
}

function privateMessage(message)
{
    client = clients.find(item => item.id == this.id); 

    if (client) {
        privateMessage = {
            name: client.user,
            message: message.text
        };

        io.sockets.connected[message.id].emit('message', privateMessage);
    }    
}

function getOptions(userOptions)
{
    console.log(userOptions); 

    clientIndex = clients.findIndex(item => item.user == userOptions.user); 

    if (clientIndex > -1 && clients[clientIndex].password == userOptions.password) {
        clients[clientIndex].id = this.id;
        clients[clientIndex].room = userOptions.room;

        this.join(userOptions.room);

        console.log(clients[clientIndex]);
    }
}

function changeRoom(newRoom)
{
    client = clients.find(item => item.id == this.id); 
    if (client) {   
        this.leave(client.room);
        client.room = newRoom.name;
        this.join(client.room);
    }
}

function disconnection()
{
    console.log(`Client with id ${this.id} disconnected`); 
}

function getUser()
{
    return clients.find(item => item.id == this.id);
}

http.listen(port, host, () => console.log(`Server listens http://${host}:${port}`));
