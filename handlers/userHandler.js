/*
*   title = user handler
*   description = user handler to handle user
*   author = Abu Sayed (pratice)
*   date = 11-09-22
*/

// scaffoding - object module
const handler = {};

handler.userHandler = (requestProparties, callBack) => {
    const acceptMethod = ['post', 'get', 'put', 'delete'];

    if (acceptMethod.indexOf(requestProparties.method) > -1) {
        handler._users[requestProparties.method](requestProparties, callBack)
    } else {
        callBack(405)
    }

}

// private 
handler._users = {}

handler._users.post = (requestProparties, callBack) => {
    const name = typeof requestProparties.body.name === 'string' && requestProparties.body.name.trim().length > 0 ? requestProparties.body.name : false;
    const phone = typeof requestProparties.body.phone === 'string' && requestProparties.body.phone.trim().length === 11 ? requestProparties.body.phone : false;
    const addreess = typeof requestProparties.body.addreess === 'string' && requestProparties.body.addreess.trim().length > 0 ? requestProparties.body.addreess : false;
    const password = typeof requestProparties.body.password === 'string' && requestProparties.body.password.trim().length > 0 ? requestProparties.body.password : false;
}

handler._users.get = (requestProparties, callBack) => {
    callBack(200)
}

handler._users.put = (requestProparties, callBack) => {

}

handler._users.delete = (requestProparties, callBack) => {

}



module.exports = handler;