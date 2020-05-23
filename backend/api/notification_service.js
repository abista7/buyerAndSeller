var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
const redis = require('redis');
const redisClient = redis.createClient();

const WebSocket = require('ws');

const options = {
    port: 4006,
};

const wss = new WebSocket.Server(options);

const notes = [];

// Broadcast function
const broadcastMessage = (message) => {
    wss.clients.forEach((client) => {
        if(client.readyState === WebSocket.OPEN){
            // if currently active
            client.send(JSON.stringify(message)); // send to client from server
        }
    });
};

const broadcastNewNote = (newNote) => {
    notes.unshift(newNote);
    broadcastMessage({
        type: 'UPDATE_MESSAGES',
        notes,
    });
};

// event 1 connection
wss.on('connection', (ws) => {
    console.log('Someone has connected');
    updateUserCount();

    // event 2 message
    ws.on('message', (message) => {
        console.log(message);
        const messageObject = JSON.parse(message);
        switch(messageObject.type){
            case 'SEND_MESSAGE':
            broadcastNewNote(messageObject.newNote);
            break;
        default:
            console.log('Message type not supported');
        }
    });

    // event 3 close, when client disconnects (close or reconnect)
    ws.on('close', () => { 
        console.log('Client has disconnected');
        updateUserCount();
    });

    // event 4 client crashed
    ws.on('error', (e) => {
        console.log(e);
    });

});