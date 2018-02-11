const users = require('./users');
const books = require('./books');

module.exports = function(app, db) {
    users(app, db);
    books(app,db);
}
