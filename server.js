//dependencies
var socket = require('socket.io');

const express = require('express')
const bodyParser = require('body-parser')
const cors = require ('cors')

const PORT = 3000
const api = require('./routes/index')
const app = express()
app.use(cors())

app.use(bodyParser.json())
app.use('/api', api)
app.get('/', function(req, res){
    res.send('Hello from server')
})

server = app.listen(PORT, function(){
    console.log("Server running on localhost:" + PORT)
})

//server del chat
//Socket setup for conexion of every client
var io = socket(server);

//Conection for every client
io.on('connection',function(socket){
    console.log('Conexion con el Socket: ', socket.id)
    socket.on('nickname', function(nickname){
        socket.nickname = nickname;
        
    });
    socket.on('connected', function(){
        var allConnectedClients = io.sockets.connected; //list os socket connected
        var send = []
        Object.keys(allConnectedClients).forEach(function(key){
            var val = allConnectedClients[key]["nickname"] + " " + allConnectedClients[key]["id"] ;
            send.push(val);
        });

        io.sockets.emit('usersconnected',send);//send to connected socket
        console.log("Enviando lista de usuarios: "+send);

    });
    

    
    socket.on('disconnect', function(){
        console.log('Usuario desconectado: '+socket.nickname);
            var allConnectedClients = io.sockets.connected; //list os socket connected
            var send = []
            Object.keys(allConnectedClients).forEach(function(key){
                var val = allConnectedClients[key]["nickname"] + " " + allConnectedClients[key]["id"] ;
                send.push(val);
            });
    
            io.sockets.emit('user',send);//send to connected socket
    });
    socket.on('chat',function(message,dest){//send messages
        io.sockets.emit('chat',message, dest);
        console.log("Recibiendo y reenviando" + message + dest);
    });
});