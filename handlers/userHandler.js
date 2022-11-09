/*
 *   title = user handler
 *   description = user handler to handle user
 *   author = Abu Sayed (pratice)
 *   date = 11-09-22
 */

// defendencies
const data = require("../lib/data");
const { hashing } = require("../helpers/utilities/utilities");
const jsonformat = require('../helpers/utilities/utilities')

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

// private
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

handler._users.get = (requestProparties, callBack) => {
    // check the specific identier of phone number
    const phone =
        typeof requestProparties.queryString.phone === "string" &&
            requestProparties.queryString.phone.trim().length === 11
            ? requestProparties.body.phone
            : false;

    if (phone) {
        data.read('user', phone, (err, user) => {
            const userData = { ...jsonformat(user) }
            if (!err && userData) {
                delete userData.password;
                callBack(200,  userData )
            } else {
                callBack(404, {
                    error: 'Requested user was not found!'
                })
            }
        })
    } else {
        callBack(404, {
            error: 'Requested user was not found!'
        })
    }
};

handler._users.put = (requestProparties, callBack) => { };

handler._users.delete = (requestProparties, callBack) => { };

module.exports = handler;
