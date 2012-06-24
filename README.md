# Tyranny

Node.JS + Websockets + That one boardgame = Fun!

## Setup

1. `git clone git://github.com/Osmose/tyranny.git && cd tyranny` to clone the
   repo.
2. `npm install && npm install -g jake` to install dependencies as well as jake.
3. `cp config/local.json-dist local.json` to create a local config.
4. Edit `config/local.json` to add database connection info.
5. `jake sync` to set up the database.
6. `jake serve` to start the server.
7. Visit http://localhost:8000 to see the app.

## Development Server

If you use the `jake serve-dev` command to start up the server, it will
auto-restart if any of the server code changes.