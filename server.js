const express = require('express');
const app = express();
const http = require('http').Server(app);
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
require('dotenv').config();
const dbUrl = process.env.MONGOLAB_URI;
const googleApiKey = process.env.GOOGLEAPIKEY;
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const session = require('express-session');

app.use(session({
    secret: 'bookish-demon-hunter',
    resave: false,
    saveUninitialized: false,
    unset: 'destroy'
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('build'));

app.get('/apikey', (req, res) => {
    // console.log('apiKey requested:', googleApiKey);
    res.send({apiKey: googleApiKey});
});

MongoClient.connect(dbUrl, (err, database) => {
    if (err) return console.log(err);
    // console.log(database);
    require('./app/routes')(app, database);

    app.get('/session', (req, res) => {
        console.log('req.session:', req.session);
        console.log('req.user:', req.user);
        res.send(req.user);
    });

    app.get('*', (req, res) => {
        console.log('sending index.html');
        res.sendFile(__dirname + '/build/index.html')
    });

    http.listen(port);
});
