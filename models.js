module.exports = function(db) {
    var models = {};

    models.Test = db.define('test', {
        name: {type: 'string'}
    });

    return models;
};