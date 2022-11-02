/*
*   title = not found handler
*   description = 404 not found handler
*   author = Abu Sayed (pratice)
*   date = 11-01-22
*/

// scaffoding - object module
const handler = {};

handler.notFoundHanler = (requestProperties, callBack) => {
    console.log(requestProperties);
    callBack(404, { message: 'your request URL not found !' })
}

module.exports = handler;