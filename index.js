/*
*   title = root app that run the api 
*   description = 
*   author = Abu Sayed (pratice)
*   date = 11-01-22
*/

// defendences
const server = require('./lib/server')
const worker = require('./lib/worker')


// scaffolding - object module
const app = {};

app.init=() => {
    // start server
    server.init();
    // start worker
    worker.init();
}

app.init();
module.exports = app;