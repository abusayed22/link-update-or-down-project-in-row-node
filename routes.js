/*
*   title = all routes 
*   description = 
*   author = Abu Sayed (pratice)
*   date = 11-01-22
*/

// dependencies
const { sampleHandler } = require('./handlers/sampleHandler');
const { userHandler } = require('./handlers/userHandler');

const routes = {
    sample: sampleHandler,
    user: userHandler
}

module.exports = routes;