var util = require('./util');

desc('Start the Tyranny server.');
task('serve', function() {
    jake.exec('NODE_ENV=local node server.js', {
        printStdout: !jake.program.opts.quiet
    });
});

desc('Start the Tyranny server with auto-restart.');
task('serve-dev', function() {
    jake.exec('node tools/node-js-development-mode.js --main-file server.js', {
        printStdout: !jake.program.opts.quiet
    });
});

desc('Create required tables in your database.');
task('sync', function() {
    util.connectToDB(function(db) {
        var models = require('./models')(db);
        for (modelname in models) {
            console.log('Syncing ' + modelname);
            models[modelname].sync();
        }
        console.log('All models synced!');
        db.end();
        complete();
    });
}, {async: true});