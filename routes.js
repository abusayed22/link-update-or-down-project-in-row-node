/*
*   title = all routes 
*   description = 
*   author = Abu Sayed (pratice)
*   date = 11-01-22
*/

// dependencies
const { sampleHandler } = require('./handlers/sampleHandler');
const { userHandler } = require('./handlers/userHandler');
const { tokenHandler } = require('./handlers/tokenHandlers');

const routes = {
    sample: sampleHandler,
    user: userHandler,
    token: tokenHandler
}

module.exports = routes;