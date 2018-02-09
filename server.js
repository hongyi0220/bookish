const express = require('express');
const app = express();
const http = require('http').Server(app);
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
require('dotenv').config();
const dbUrl = process.env.MONGOLAB_URI;
const googleApiKey = process.env.GOOGLEAPIKEY;
const port = process.env.PORT || 8080;
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const dbErrMsg = 'There was a problem connecting to database ';

// Configure passportJs login strategy
passport.use(new LocalStrategy(
    function(username, password, done) {
        MongoClient.connect(dbUrl, (err, db) => {
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

// This stores user in session after authentication
passport.serializeUser(function(user, done) {
    done(null, user._id);
});

// This retrieves user info from database using user._id set in session
//and store it in req.user because it is more secure not to store user info in session cookie
passport.deserializeUser(function(id, done) {
    MongoClient.connect(dbUrl, (err, db) => {
        if (err) console.error(dbErrMsg, err);
        const Users = db.collection('users');
        Users.findOne({_id: mongo.ObjectId(id)}, function(err, user) {
            done(err, user);
            db.close();
        });
    });
});

app.use(passport.initialize());
app.use(passport.session());

app.post('/approve-request', (req, res) => {
    MongoClient.connect(dbUrl, (err, db) => {
        if (err) console.error(dbErrMsg, err);
        const Books = db.collection('books');
        Books.updateOne(
            { bookId: bookId },
            {
                $pull: { ownedby: username },
                $pop: { wishlist: -1 }
            }
        );
        Books.deleteMany(
            {
                ownedby: { $size: 0 },
                wishlist: { $size: 0 }
            }
        );
        db.close();
        res.end();
    });
});

app.post('/remove-book', (req, res) => {
    // console.log('removing book @ server');
    const bookId = req.body.bookId;
    const username = req.body.username;

    MongoClient.connect(dbUrl, (err, db) => {
        if (err) console.error(dbErrMsg, err);
        const Books = db.collection('books');
        Books.updateOne(
            { bookId: bookId },
            { $pull: { ownedby: username } }
        );
        Books.deleteMany({ ownedby: { $size: 0 } });
        db.close();
        res.redirect('/mybooks');
    });
});

app.get('/get-books', (req, res) => {
    MongoClient.connect(dbUrl, (err, db) => {
        if (err) console.error(dbErrMsg, err);
        const Books = db.collection('books');
        Books.find({})
        .toArray((err, docs) => {
            if (err) console.error(err);
            db.close();
            res.send(docs);
        });
    });
});

app.post('/request-book', (req, res) => {
    const bookId = req.body.bookId;
    const username = req.body.username;

    MongoClient.connect(dbUrl, (err, db) => {
        if (err) console.error(dbErrMsg, err);
        const Books = db.collection('books');

        Books.updateOne(
            {bookId: bookId},
            {$push: {
                wishlist: username
            }}
        );
        db.close();
        res.end();
    });
});

app.post('/add-book', (req, res) => {
    const book = req.body.book;
    // console.log('@/addbook; book:', book);
    const bookId = book.id;
    const username = req.body.username;

    MongoClient.connect(dbUrl, (err, db) => {
        if (err) console.error(dbErrMsg, err);
        const Books = db.collection('books');
        Books.findOne({ bookId: bookId })
        .then(doc => {
            if (!doc) {
                Books.insertOne({
                    bookId: bookId,
                    book: book,
                    ownedby: [username],
                    wishlist: []
                });
                db.close();
                res.end();
            } else {
                Books.updateOne(
                    {bookId: bookId},
                    {$push: {
                        ownedby: username
                    }}
                );
                db.close();
                res.end();
            }
        })
        .catch(err => console.error(err));
    });
});

app.post('/profile', (req, res) => {
    const username = req.body.username || req.user.username;
    const password = req.body.password || req.user.password;
    const location = req.body.location || req.user.location;
    // console.log('updating porfile; req.user:', req.user);
    MongoClient.connect(dbUrl, (err, db) => {
        if (err) console.error(dbErrMsg, err);
        // Check if the username is already taken
        const Users = db.collection('users');

        Users.updateOne(
            { username: username },
            { $set: {
                username: username,
                password: password,
                location: location
            }}
        );
        db.close();
        res.redirect('/profile/updated');
    });
});

app.get('/apikey', (req, res) => {
    // console.log('apiKey requested:', googleApiKey);
    res.send({apiKey: googleApiKey});
});

app.get('/session', (req, res) => {
    // console.log('req.session:', req.session);
    // console.log('req.user:', req.user);
    res.send(req.user);
});

app.post('/login',
    function(req, res) {
        passport.authenticate('local', function(err, user, info) {
            if (err) return console.error(err);
            if (!user) return res.redirect('/login')
            req.login(user, function(err) {
                if (err) return console.error(err);
                return res.redirect('/' + user.username);
            });
            res.end();
        })(req, res);
});

app.get('/logout', (req, res) => {
    // console.log('user logged out');
    req.logout();
    res.sendStatus(200);
    // console.log('req.session:', req.session);
    // console.log('req.user:', req.user);
});

app.post('/signup', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    MongoClient.connect(dbUrl, (err, db) => {
        // console.log('connected');
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
    console.log('sending index.html');
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
