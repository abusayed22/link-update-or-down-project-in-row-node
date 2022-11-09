/*
*   title = utilities
*   description = all of utilities
*   author = Abu Sayed (pratice)
*   date = 12-09-22
*/

// dependcies



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


module.exports = utilities;