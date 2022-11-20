/*
 *   title = check handler
 *   description = 
 *   author = Abu Sayed (pratice)
 *   date = 11-20-22
 */

// defendencies
const data = require("../lib/data");
const { hashing, createRandomToken } = require("../helpers/utilities/utilities");
const { jsonformat } = require('../helpers/utilities/utilities')

// scaffoding - object module
const handler = {};

handler.tokenHandler = (requestProparties, callBack) => {

    const acceptMethod = ["post", "get", "put", "delete"];

    if (acceptMethod.indexOf(requestProparties.method) > -1) {
        handler._token[requestProparties.method](requestProparties, callBack);
    } else {
        callBack(405);
    }
};

// service _ use & scaffolding
handler._token = {};

// is public route for any clind login
handler._token.post = (requestProparties, callBack) => {
    const phone =
        typeof requestProparties.body.phone === "string" &&
            requestProparties.body.phone.trim().length === 11
            ? requestProparties.body.phone
            : false;

    const password =
        typeof requestProparties.body.password === "string" &&
            requestProparties.body.password.trim().length > 0
            ? requestProparties.body.password
            : false;

    if (phone && password) {
        data.read('users', phone, (err, userdata) => {
            const hasedPassword = hashing(password);
            if (hasedPassword === jsonformat(userdata).password) {
                const tokenId = createRandomToken(20)
                const expires = Date.now() + 60 * 60 * 1000
                const tokenObject = {
                    id: tokenId,
                    expires,
                    phone
                }

                data.create('tokens', tokenId, tokenObject, (err) => {
                    if (!err) {
                        callBack(200, tokenObject)
                    } else {
                        callBack(500, {
                            'error': 'There was a problem an sever side!'
                        });
                    }
                })

            } else {
                callBack(400, {
                    'error': 'password is not valid!!'
                });
            }
        })
    }
};


handler._token.get = (requestProparties, callBack) => {
    const id =
        typeof requestProparties.queryString.id === 'string' &&
            requestProparties.queryString.id.trim().length === 20
            ? requestProparties.queryString.id
            : false;

    if (id) {
        data.read('tokens', id, (err, tokenData) => {
            const token = { ...jsonformat(tokenData) }
            if (!err && token) {
                callBack(200, token);
            } else {
                callBack(404, {
                    error: 'Requested token was not found!!!'
                })
            }
        })
    } else {
        callBack(404, {
            error: 'Requested token was not found!'
        })
    }
};

handler._token.put = (requestProparties, callBack) => {
    const id =
        typeof requestProparties.body.id === 'string' &&
            requestProparties.body.id.trim().length === 20
            ? requestProparties.body.id
            : false;

    const extend = typeof requestProparties.body.extend === "boolean" && requestProparties.body.extend === true

    if (id, extend) {
        data.read('tokens', id, (err1, tokenData) => {
            const tokenObject = jsonformat(tokenData);
            if (tokenObject.expires > Date.now()) {
                tokenObject.expires = Date.now() + 60 * 60 * 1000
                data.update('tokens', id, tokenObject, (err2) => {
                    if (!err2) {
                        callBack(200)
                    } else {
                        callBack(500, {
                            error: 'There was a problem in sever side'
                        })
                    }
                })
            } else {
                callBack(400, {
                    error: 'your token expire already expired!'
                })
            }
        })
    }

};

handler._token.delete = (requestProparties, callBack) => {
    const id =
        typeof requestProparties.queryString.id === 'string' &&
            requestProparties.queryString.id.trim().length === 20
            ? requestProparties.queryString.id
            : false;

    if (id) {
        data.delete('tokens', id, (err1) => {
            if (!err1) {
                callBack(200, {
                    'message': 'There was deleted successfully!'
                })
            } else {
                callBack(400, {
                    'error': 'your delete request was not deleted!'
                })
            }
        })
    } else {
        callBack(400, {
            'error': 'your delete request was not deleted!'
        })
    }
};


// token verify (ulitility)
handler._token.verify = (id, phone, callBack) => {
    data.read('tokens', id, (err, tokenData) => {
        if (!err && tokenData) {
            if (jsonformat(tokenData).phone === phone && jsonformat(tokenData).expires > Date.now()) {
                callBack(true)
            } else {
                callBack(false)
            }
        } else {
            callBack(false)
        }
    })
}


module.exports = handler;
