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
    if (typeof (str) === 'string' && str.length > 0) {

        console.log(enviroments, process.env.ENB_NODE)
        const hash = crypto.createHmac('sha256', enviroments.hashingKey)
            .update(str)
            .digest('hex');

        return hash;
    }
}

utilities.createRandomToken = (strLength) => {
    let length = strLength
    length = typeof strLength === 'number' && length > 0 ? strLength : false;

    if (length) {
        const char = 'abcdefjklmnopqrstwxyz1234567890'
        let output = '';
        for (i = 1; i <= length; i += 1) {
            const randomChar = char.charAt(
                Math.floor(Math.random() * char.length)
            );
            output += randomChar;
        }
        return output;
    } else {
        return false
    }
}

// utilities.createRandomToken = (strlength) => {
//     let length = strlength;
//     length = typeof strlength === 'number' && strlength > 0 ? strlength : false;

//     if (length) {
//         const possiblecharacters = 'abcdefghijklmnopqrstuvwxyz1234567890';
//         let output = '';
//         for (let i = 1; i <= length; i += 1) {
//             const randomCharacter = possiblecharacters.charAt(
//                 Math.floor(Math.random() * possiblecharacters.length)
//             );
//             output += randomCharacter;
//         }
//         return output;
//     }
//     return false;
// };


module.exports = utilities;