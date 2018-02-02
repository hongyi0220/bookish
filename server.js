
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
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const dbErrMsg = 'There was a problem connecting to database ';

passport.use(new LocalStrategy(
    function(username, password, done) {
        MongoClient.connect(dbUrl, (err, db) => {
            if (err) console.error(dbErrMsg, err);
            const users = db.collection('users');
            users.findOne({ username: username }, function(err, user) {
                if (err) return done(err);
                if (!user) return done(null, false, {message: 'Incorrect username.'});
                if (user.password !== password) return done(null, false, {message: 'Incorrect password'});
                return done(null, user);
            });
        });
    }
));

app.use(session({
    secret: 'bookish-demon-hunter',
    resave: false,
    saveUninitialized: false,
    unset: 'destroy'
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/signup', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
console.log('hi');
    MongoClient.connect(dbUrl, (err, db) => {
        console.log('connected');
        if (err) console.error(dbErrMsg, err);
        // Check if the username is already taken
        const users = db.collection('users');

        users.find({ username: username })
        .toArray((err, docs) => {
            if (err) console.error(err);
            if (docs.length) res.redirect('/signup/invalid_username');
            else {
                const schema = {
                    username: username,
                    password: password
                };
                users.insert(schema);
                db.close();
                res.redirect('/');
            }
        });
    });
});

app.use(express.static('build'));

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/build/index.html')
});
// Listen for change on the front-end, then emit to all pertinent connected users
// io.on('connection', function(socket) {
//     console.log('a user connected');
//     console.log('socket#id:', socket.id);
//     // console.log('socket:', socket);
//     // const socketId = socket.id;
//     // const user = {};
//     // socket.on('stock symbols', function(symbols) {
//     //     socket.broadcast.emit('stock symbols', symbols);
//     // });
//
//     socket.on('disconnect', function() {
//         console.log('user disconnected');
//     });
// });

http.listen(port);
