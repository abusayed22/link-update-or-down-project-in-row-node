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
const worker = {};

// start the worker
worker.init= () => {
    console.log('start the worker')
}


module.exports = worker;
