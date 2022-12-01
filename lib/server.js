/*
*   title = worker state
*   description = 
*   author = Abu Sayed (pratice)
*   date = 11-01-22
*/

// defendences
const http = require('http');
const { handleReqRes } = require('../helpers/handleReqRes');

// scaffolding - object module
const server = {};

server.config = {
    port: 3000
};

// create server &
server.creatServer = () => {
    const createServerVariable = http.createServer(server.handleReqRes);
    createServerVariable.listen(server.config.port, () => {
        console.log(`listin to prot ${server.config.port}`);
    });
};

server.handleReqRes = handleReqRes;

// start the server
server.init = () => {
    console.log('')
}

server.init = () => {
    server.creatServer()
}
module.exports = server;


