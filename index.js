/*
*   title = root app that run the api 
*   description = 
*   author = Abu Sayed (pratice)
*   date = 11-01-22
*/

// defendences
const http = require('http');
const {handleReqRes} = require('./helpers/handleReqRes');
const enviroment = require('./helpers/enviroments');


// scaffolding - object module
const app = {};

app.confiq = {
    port: 3000
}

app.createServer = () => {
    // create server
    const server = http.createServer(app.handleReqRes);
    server.listen(enviroment.port, () => {
        // when server start 
        console.log(`listing port ${enviroment.port} started`)
    })
}

app.handleReqRes = handleReqRes;

// calling for run
app.createServer();