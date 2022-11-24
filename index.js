/*
*   title = root app that run the api 
*   description = 
*   author = Abu Sayed (pratice)
*   date = 11-01-22
*/

// defendences
const http = require('http');
const { handleReqRes } = require('./helpers/handleReqRes');
const enviroment = require('./helpers/enviroments');
const lib = require('./lib/data');
const {sendTwilioSms} = require('./helpers/notifications')


// scaffolding - object module
const app = {};

// @TODO: remove the notification 
sendTwilioSms('01911111111', 'hello world', (err) => {
    console.log(`this is the error`, err);
});

app.createServer = () => {
    // create server
    const server = http.createServer(app.handleReqRes);
    server.listen(enviroment.port, () => {
        // when server start 
        console.log(`listing port ${enviroment.port} started`)
    })
}

app.handleReqRes = handleReqRes;
// this line will clear tommorow


// calling for run
app.createServer();