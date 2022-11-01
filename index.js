/*
*   title = root app that run the api 
*   description = 
*   author = Abu Sayed (pratice)
*   date = 11-01-22
*/

// defendences
const http = require('http');

// scaffolding - object module
const app = {};

// create confiq
app.confiq = {
    port:5000
};

app.createServer = () => {
    // create server
   const server = http.createServer(app.handleReqRes);
   server.listen(app.confiq.port, () => {
    // when server start 
    console.log(`listing port ${app.confiq.port} started`)
   })
}

app.handleReqRes = (req,res) => {
    // response handle
    res.end('Hello programer')
};

// calling for run
app.createServer();