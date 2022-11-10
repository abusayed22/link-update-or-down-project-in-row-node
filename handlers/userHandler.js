/*
 *   title = user handler
 *   description = user handler to handle user
 *   author = Abu Sayed (pratice)
 *   date = 11-09-22
 */

// defendencies
const data = require("../lib/data");
const { hashing } = require("../helpers/utilities/utilities");
const { jsonformat } = require('../helpers/utilities/utilities')

// scaffoding - object module
const handler = {};

handler.userHandler = (requestProparties, callBack) => {
    const acceptMethod = ["post", "get", "put", "delete"];

    if (acceptMethod.indexOf(requestProparties.method) > -1) {
        handler._users[requestProparties.method](requestProparties, callBack);
    } else {
        callBack(405);
    }
};

// service _ use
handler._users = {};

handler._users.post = (requestProparties, callBack) => {
    const name =
        typeof requestProparties.body.name === "string" &&
            requestProparties.body.name.trim().length > 0
            ? requestProparties.body.name
            : false;
    const phone =
        typeof requestProparties.body.phone === "string" &&
            requestProparties.body.phone.trim().length === 11
            ? requestProparties.body.phone
            : false;
    const addreess =
        typeof requestProparties.body.addreess === "string" &&
            requestProparties.body.addreess.trim().length > 0
            ? requestProparties.body.addreess
            : false;
    const password =
        typeof requestProparties.body.password === "string" &&
            requestProparties.body.password.trim().length > 0
            ? requestProparties.body.password
            : false;

    if (name && phone && addreess && password) {
        data.read("users", phone, (err1) => {
            if (err1) {
                //create hobe
                const dataObject = {
                    name,
                    phone,
                    addreess,
                    password: hashing(password),
                };
                data.create("users", phone, dataObject, (err2) => {
                    if (!err2) {
                        callBack(202, {
                            message: "User created successfully!",
                        });
                    } else {
                        false;
                    }
                });
            } else {
                callBack(400, {
                    error: "could not create user!",
                });
            }
        });
    }
};

//@:TODO get method not working
handler._users.get = (requestProparties, callBack) => {
    // check the specific identier of phone number
    const phone =
        typeof requestProparties.queryString.phone === 'string' &&
            requestProparties.queryString.phone.trim().length === 11
            ? requestProparties.queryString.phone
            : false;

    if (phone) {
        data.read('users', phone, (err, u) => {
            const userData = { ...jsonformat(u) }
            if (!err && userData) {
                delete userData.password;
                callBack(200, userData);
            } else {
                callBack(404, {
                    error: 'Requested user was not found!!!'
                })
            }
        })
    } else {
        callBack(404, {
            error: 'Requested user was not found!'
        })
    }
};

handler._users.put = (requestProparties, callBack) => {
    const name =
        typeof requestProparties.body.name === "string" &&
            requestProparties.body.name.trim().length > 0
            ? requestProparties.body.name
            : false;
    const phone =
        typeof requestProparties.body.phone === "string" &&
            requestProparties.body.phone.trim().length === 11
            ? requestProparties.body.phone
            : false;
    const addreess =
        typeof requestProparties.body.addreess === "string" &&
            requestProparties.body.addreess.trim().length > 0
            ? requestProparties.body.addreess
            : false;
    const password =
        typeof requestProparties.body.password === "string" &&
            requestProparties.body.password.trim().length > 0
            ? requestProparties.body.password
            : false;

    if (phone) {
        if (name || addreess || password) {
            data.read('users', phone, (err, user) => {
                const userData = { ...jsonformat(user) }
                /* they are same problem @userData undefind */
                if (!err && userData) {
                    if (name) {
                        userData.name = name
                    }
                    if (addreess) {
                        userData.addreess = addreess
                    }
                    if (password) {
                        userData.password = hashing(password)
                    }

                    // update to database
                    data.update('users', phone, userData, (err2) => {
                        if (!err2) {
                            callBack(200, userData)
                        } else {
                            callback(500, {
                                error: 'There was a problem in the server side!',
                            });
                        }
                    })
                } else {
                    callBack(400, {
                        'error': 'there was a problem in sever side!!!'
                    })
                }
            })
        } else {
            callBack(400, {
                'error': 'your requested have an error!'
            })
        }
    } else {
        callBack(400, {
            "error": "there was a problem in sever side!"
        })
    }
};

handler._users.delete = (requestProparties, callBack) => {
    const phone =
    typeof requestProparties.queryString.phone === "string" &&
        requestProparties.queryString.phone.trim().length === 11
        ? requestProparties.queryString.phone
        : false;

    if(phone) {
        data.read('users',phone, (err) => {
            if(!err) {
                data.delete('users',phone, (err2) => {
                    if(!err2) {
                        callBack(200, {
                            'message': 'deleted was successfully!'
                        })
                    } else {
                        callBack(404,{
                            'error': 'your delete requested was not found!'
                        })
                    }
                })
            } else  {
                callBack(404,{
                    'error': 'your delete requested was not found!!!'
                })
            }
        })
    }
};

module.exports = handler;
