/*
*   title = sample handler
*   description = 202 sample hander
*   author = Abu Sayed (pratice)
*   date = 11-01-22
*/

// scaffoding - object module
const handler = {};

handler.sampleHandler = (requestProparties, callBack) => {
    console.log(requestProparties);
    callBack(202, { message: 'This is sample' })
}

module.exports = handler;