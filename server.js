const express = require('express');
const app = express();
const http = require('http').Server(app);
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
require('dotenv').config();
const dbUrl = process.env.MONGOLAB_URI;
const googleApiKey = process.env.GOOGLEAPIKEY;
const port = process.env.PORT || 8080;
const session = require('express-session');
const bodyParser = require('body-parser');
const MongoStore = require('connect-mongo')(session);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('build'));

app.get('/apikey', (req, res) => {
    res.send({apiKey: googleApiKey});
});

MongoClient.connect(dbUrl, (err, database) => {
    if (err) return console.log(err);

    app.use(session({
        store: new MongoStore({db: database}),
        secret: 'bookish-demon-hunter',
        resave: false,
        saveUninitialized: false,
        unset: 'destroy'
    }));

    require('./app/routes')(app, database);

    app.get('/user', (req, res) => {
        console.log('getting session info');
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
