/*
*   title = all request & response utility is here
*   description = 
*   author = Abu Sayed (pratice)
*   date = 11-01-22
*/

// dependencies
const url = require('url');
const { StringDecoder } = require('string_decoder');
const routes = require('../routes');
const { sampleHandler } = require('../handlers/sampleHandler');
const { notFoundHanler } = require('../handlers/notFoundHandle');
const { STATUS_CODES } = require('http');

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

    // all request proparties in a object\
    const requestProperties = {
        parsedUrl,
        path,
        trimedPath,
        queryString,
        method,
        headersObject
    }

    // choice handle
    const chocsenHandler = routes[trimedPath] ? routes[trimedPath] : notFoundHanler
    chocsenHandler(requestProperties, (statusCode, payload) => {
        statusCode = typeof (statusCode) === 'number' ? statusCode : 500 ;
        payload = typeof (payload) === 'object' ? payload : {};

        const payloadString = JSON.stringify(payload);

        //return final response
        res.writeHead(statusCode);
        res.end(payloadString);
    })


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