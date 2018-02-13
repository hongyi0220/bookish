const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const ObjectId = require('mongodb').ObjectId;

module.exports = function(app, db) {
    const Users = db.collection('users');

    // Configure passportJs login strategy
    passport.use(new LocalStrategy(
        function(username, password, done) {
            Users.findOne({ username: username }, function(err, user) {
                if (err) return done(err);
                if (!user) return done(null, false, {message: 'Incorrect username.'});
                if (user.password !== password) return done(null, false, {message: 'Incorrect password'});
                return done(null, user);
            });
        }
    ));

    // This stores user in session after authentication
    passport.serializeUser(function(user, done) {
        console.log('serializing user');
        console.log(user);
        done(null, user._id);
    });

    // This retrieves user info from database using user._id set in session
    //and store it in req.user because it is more secure
    passport.deserializeUser(function(id, done) {
        console.log('deserializing user');
        Users.findOne({_id: new ObjectId(id)}, function(err, user) {
            done(err, user);
        });
    });

    app.use(passport.initialize());
    app.use(passport.session());

    app.post('/login',
        function(req, res) {
            passport.authenticate('local', function(err, user, info) {
                if (err) return console.error(err);
                if (!user) return res.redirect('/login');
                req.login(user, function(err) {
                    if (err) return console.error(err);
                    return res.redirect('/' + user.username);
                });
                res.end();
            })(req, res);
    });

    app.post('/signup', (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        // Check if the username is already taken
        Users.findOne({ username: username }, function(err, user) {
            if (err) console.error(err);
            if (user) res.redirect('/signup/invalid-username');
            else {
                const schema = {
                    username: username,
                    password: password
                };
                Users.insert(schema);
                res.redirect('/signup/success');
            }
        });
    });

    app.get('/logout', (req, res) => {
        console.log('user logged out');
        req.logout();
        req.session.destroy(function() {
            res.redirect('/')
        });
        // res.sendStatus(200);
        console.log('req.session:', req.session);
        console.log('req.user:', req.user);
    });

    app.post('/profile', (req, res) => {
        const username = req.body.username || req.user.username;
        const password = req.body.password || req.user.password;
        const location = req.body.location || req.user.location;
        // console.log('updating porfile; req.user:', req.user);

        Users.updateOne(
            { username: username },
            { $set: {
                username: username,
                password: password,
                location: location
            }}
        );
        res.redirect('/profile/updated');
    });
}
