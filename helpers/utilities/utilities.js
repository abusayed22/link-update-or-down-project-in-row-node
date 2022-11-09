/*
*   title = utilities
*   description = all of utilities
*   author = Abu Sayed (pratice)
*   date = 12-09-22
*/

// dependcies
const crypto = require('crypto');
const enviroments = require('../enviroments')



const utilities = {};

// json modify utility
utilities.jsonformat = (strjson) => {
    let output;
    try {
        output = JSON.parse(strjson)
    } catch (error) {
        output = {}
    }
    return output;
}

// hashing anything
utilities.hashing = (str) => {
    if(typeof(str) === 'string' && str.length > 0) {
        
        console.log(enviroments, process.env.ENB_NODE)
        const hash = crypto.createHmac('sha256', enviroments.hashingKey )
        .update(str)
        .digest('hex');

        return hash;
    }
}


module.exports = utilities;