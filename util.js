var config = require('config');
var orm = require('orm');

// Connects to the DB and calls the given callback with the db object.
module.exports.connectToDB = function(callback, context) {
    var connectionString = (config.db.protocol + '://' + config.db.username + ':' +
                            config.db.password + '@' + config.db.hostname + '/' +
                            config.db.database);

    return orm.connect(connectionString, function(success, db) {
        if (!success) {
            return console.log('Connection to db failed: ' + connectionString);
        }

        console.log('Database connection established.');
        callback.call(context, db);
    });
};