/*
*   title = all request & response utility is here
*   description = 
*   author = Abu Sayed (pratice)
*   date = 11-01-22
*/

// dependencies
const url = require('url');
const { StringDecoder } = require('string_decoder');

// scaffolding object 
const handlers = {};

handlers.handleReqRes = (req, res) => {
    // request handle 

    //url parse
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimedPath = path.replace(/^\/+|\/+$/g, '');
    const queryString = parsedUrl.query;
    const method = req.method.toLowerCase();
    const headersObject = req.headers;

    const decoder = new StringDecoder('utf-8');




    let realData = ''
    req.on('data', (buffer) => {
        realData += decoder.write(buffer)
    })

    req.on('end', () => {
        realData += decoder.end();
        console.log(realData);
        // response handle
        res.end('Hello programer')
    })


};

module.exports = handlers;