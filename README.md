# Tyranny

Node.JS + Websockets + That one boardgame = Fun!

## Prerequisites

- [NodeJS 0.6.9 or greater](http://nodejs.org/)
- [Jake](https://github.com/isaacs/node-jake) (`npm install -g jake` should do it)

## Setup

1. `git clone git://github.com/Osmose/tyranny.git && cd tyranny` to clone the
   repo.
2. `npm install` to install dependencies.
3. `cp config/local.json-dist local.json` to create a local config.
4. Edit `config/local.json` to add database connection info.
5. `jake sync` to set up the database.
6. `jake serve` to start the server.
7. Visit http://localhost:8000 to see the app.

## Development Server

If you use the `jake serve-dev` command to start up the server, it will
auto-restart if any of the server code changes.