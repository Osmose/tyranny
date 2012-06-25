module.exports = function(db) {
    var models = {};

    models.Test = db.define('test', {
        name: {type: 'string'}
    });

    models.Players = db.define('players', {
        name: {type: 'string'},
        password: {type: 'string'}
    });

    return models;
};
