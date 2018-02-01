
const express = require('express');
const app = express();
const http = require('http').Server(app);
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
require('dotenv').config();
const dbUrl = process.env.MONGOLAB_URI;
const port = process.env.PORT || 8080;
const io = require('socket.io')(http);
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

app.use(express.static('build'));

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/build/index.html')
});
// Listen for change on the front-end, then emit to all pertinent connected users
io.on('connection', function(socket) {
    console.log('a user connected');
    console.log('socket#id:', socket.id);
    // console.log('socket:', socket);
    // const socketId = socket.id;
    // const user = {};
    // socket.on('stock symbols', function(symbols) {
    //     socket.broadcast.emit('stock symbols', symbols);
    // });

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
});

http.listen(port);
