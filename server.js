
const express = require('express');
const app = express();
const http = require('http').Server(app);
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
require('dotenv').config();
const dbURL = process.env.MONGOLAB_URI;
const port = process.env.PORT || 8080;
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const dbErrMsg = 'There was a problem connecting to database ';

passport.use(new LocalStrategy(
    function(username, password, done) {
        MongoClient.connect(dbURL, (err, db) => {
            if (err) console.error(dbErrMsg, err);
            const Users = db.collection('users');
            Users.findOne({ username: username }, function(err, user) {
                if (err) return done(err);
                if (!user) return done(null, false, {message: 'Incorrect username.'});
                if (user.password !== password) return done(null, false, {message: 'Incorrect password'});
                db.close();
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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    MongoClient.connect(dbURL, (err, db) => {
        if (err) console.error(dbErrMsg, err);
        const Users = db.collection('users');
        Users.findOne({_id: id}, function(err, user) {
            done(err, user);
            db.close();
        });
    });
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

app.post('/signup', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
console.log('hi');
    MongoClient.connect(dbURL, (err, db) => {
        console.log('connected');
        if (err) console.error(dbErrMsg, err);
        // Check if the username is already taken
        const Users = db.collection('users');

        Users.findOne({ username: username }, function(err, user) {
            if (err) console.error(err);
            if (user) res.redirect('/signup/invalid_username');
            else {
                const schema = {
                    username: username,
                    password: password
                };
                Users.insert(schema);
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
