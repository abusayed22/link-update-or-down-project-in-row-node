/*
 *   title = check handler
 *   description =
 *   author = Abu Sayed (pratice)
 *   date = 11-20-22
 */

// defendencies
const data = require("../lib/data");
const {
    hashing,
    createRandomToken,
} = require("../helpers/utilities/utilities");
const { jsonformat } = require("../helpers/utilities/utilities");
const { _token } = require("./tokenHandlers");
const { maxCheck } = require("../helpers/enviroments");

// scaffoding - object module
const handler = {};

handler.checkHandler = (requestProparties, callBack) => {
    const acceptMethod = ["post", "get", "put", "delete"];

    if (acceptMethod.indexOf(requestProparties.method) > -1) {
        handler._check[requestProparties.method](requestProparties, callBack);
    } else {
        callBack(405);
    }
};

// service _ use & scaffolding
handler._check = {};

// is public route for any clind login
handler._check.post = (requestProparties, callBack) => {
    const protocol =
        typeof requestProparties.body.protocol === "string" &&
            ["http", "https"].indexOf(requestProparties.body.protocol) > -1
            ? requestProparties.body.protocol
            : false;

    const url =
        typeof requestProparties.body.url === "string" &&
            requestProparties.body.url.trim().length > 0
            ? requestProparties.body.url
            : false;

    const method =
        typeof requestProparties.body.method === "string" &&
            ["GET", "POST", "PUT", "DELETE"].indexOf(requestProparties.body.method) > -1
            ? requestProparties.body.method
            : false;

    const successCodes =
        typeof requestProparties.body.successCode === "object" &&
            requestProparties.body.successCode instanceof Array
            ? requestProparties.body.successCode
            : [];

    const timeSecends =
        typeof requestProparties.body.timeSecends === "number" &&
            requestProparties.body.timeSecends % 1 === 0 &&
            requestProparties.body.timeSecends >= 1 &&
            requestProparties.body.timeSecends <= 5
            ? requestProparties.body.timeSecends
            : false;

    if (protocol && url && method && successCodes && timeSecends) {
        const token =
            typeof requestProparties.headersObject.token === "string"
                ? requestProparties.headersObject.token
                : false;

        // lookup the user phone by reading the token
        data.read("tokens", token, (err1, tokenData) => {
            if (!err1) {
                const userPhone = jsonformat(tokenData).phone;

                // lookup the user data
                data.read("users", userPhone, (err2, userData) => {
                    if (!err2 && userData) {
                        _token.verify(token, userPhone, (tokenIsValid) => {
                            if (tokenIsValid) {
                                const userObject = jsonformat(userData);
                                const checkUser =
                                    typeof userObject.check === "object" &&
                                        userObject.check instanceof Array
                                        ? userObject.check
                                        : [];

                                if (checkUser.length < maxCheck) {
                                    const ID = createRandomToken(20);
                                    const checkObject = {
                                        id: ID,
                                        userPhone,
                                        protocol,
                                        url,
                                        method,
                                        successCodes,
                                        timeSecends,
                                    };

                                    // save the data
                                    data.create("checks", ID, checkObject, (err5) => {
                                        if (!err5) {
                                            userObject.check = checkUser;
                                            userObject.check.push(ID);

                                            data.update("users", userPhone, userObject, (err6) => {
                                                if (!err6) {
                                                    callBack(200, {
                                                        checkObject,
                                                    });
                                                } else {
                                                    callBack(500, {
                                                        error: "sever side problem!",
                                                    });
                                                }
                                            });
                                        } else {
                                            callBack(403, {
                                                error: "Authentication failur!",
                                            });
                                        }
                                    });
                                } else {
                                    callBack(403, {
                                        error: "Authentication failur!",
                                    });
                                }
                            } else {
                                callBack(403, {
                                    error: "Authentication failur!",
                                });
                            }
                        });
                    } else {
                        callBack(403, {
                            error: "Authentication failur!",
                        });
                    }
                });
            } else {
                callBack(400, {
                    error: "You have a problem in your request",
                });
            }
        });
    }
};

handler._check.get = (requestProparties, callBack) => {
    const id =
        typeof requestProparties.queryString.id === "string" &&
            requestProparties.queryString.id.trim().length === 20
            ? requestProparties.queryString.id
            : false;

    if (id) {
        data.read("checks", id, (err, checkData) => {
            if (!err && checkData) {
                const jsonCheck = jsonformat(checkData);
                const token =
                    typeof requestProparties.headersObject.token === "string"
                        ? requestProparties.headersObject.token
                        : false;

                _token.verify(token, jsonCheck.userPhone, (tokenIsValid) => {
                    if (tokenIsValid) {
                        callBack(200, jsonCheck)
                    } else {
                        callBack(403, {
                            error: "Authentication failure!"
                        })
                    }
                }
                )
            };

        });
    } else {
        callBack(404, {
            error: "Requested token was not found!",
        });
    }
};

handler._check.put = (requestProparties, callBack) => {
    const id =
        typeof requestProparties.body.id === "string" &&
            requestProparties.body.id.trim().length === 20
            ? requestProparties.body.id
            : false;

    const protocol =
        typeof requestProparties.body.protocol === "string" &&
            ["http", "https"].indexOf(requestProparties.body.protocol) > -1
            ? requestProparties.body.protocol
            : false;

    const url =
        typeof requestProparties.body.url === "string" &&
            requestProparties.body.url.trim().length > 0
            ? requestProparties.body.url
            : false;

    const method =
        typeof requestProparties.body.method === "string" &&
            ["GET", "POST", "PUT", "DELETE"].indexOf(requestProparties.body.method) > -1
            ? requestProparties.body.method
            : false;

    const successCodes =
        typeof requestProparties.body.successCode === "object" &&
            requestProparties.body.successCode instanceof Array
            ? requestProparties.body.successCode
            : [];
          

    const timeSecends =
        typeof requestProparties.body.timeSecends === "number" &&
            requestProparties.body.timeSecends % 1 === 0 &&
            requestProparties.body.timeSecends >= 1 &&
            requestProparties.body.timeSecends <= 5
            ? requestProparties.body.timeSecends
            : false;

    if (id) {
        if(protocol || url || method || successCodes || timeSecends) {
            data.read("checks", id, (err, checkData) => {
                if (!err && checkData) {
                    const checkObject = jsonformat(checkData);
                    const token =
                        typeof requestProparties.headersObject.token === "string"
                            ? requestProparties.headersObject.token
                            : false;
    
                    _token.verify(token, checkObject.userPhone, (tokenIsValid) => {
                        if (tokenIsValid) {
                            if (protocol) {
                                checkObject.protocol = protocol
                            }
                            if (url) {
                                checkObject.url = url
                            }
                            if (method) {
                                checkObject.method = method
                            }
                            if (successCodes) {
                                checkObject.successCodes = successCodes
                            }
                            if (timeSecends) {
                                checkObject.timeSecends = timeSecends
                            }
                            data.update('checks',id,checkObject,(err) => {
                                if(!err) {
                                    callBack(200)
                                } else {
                                    callBack(500, {
                                        error: "server side error!"
                                    })
                                }
                            })
                        } else {
                            callBack(403, {
                                error: "Authentication failure!"
                            })
                        }
                    })
    
                } else {
                    callBack(400, {
                        error: "You have a problem in your request",
                    });
                }
            })
        } else {
            callBack(400, {
                error: "You have a problem in your request",
            });
        }
    } else {
        callBack(400, {
            error: "You have a problem in your request",
        });
    }


};

handler._check.delete = (requestProparties, callBack) => {
    const id =
        typeof requestProparties.queryString.id === "string" &&
            requestProparties.queryString.id.trim().length === 20
            ? requestProparties.queryString.id
            : false;

    if (id) {
        data.read("checks", id, (err1,checkData) => {
            if (!err1 && checkData) {
                const checkObject = jsonformat(checkData);
                const token =
                        typeof requestProparties.headersObject.token === "string"
                            ? requestProparties.headersObject.token
                            : false;

                _token.verify(token, checkObject.userPhone, (tokenIsValid) => {
                    if (tokenIsValid) {
                        data.delete('checks',id,(err5) => {
                            if(!err5) {
                                data.read('users',checkObject.userPhone,(err6,userData)=> {
                                    if(!err6 && userData) {
                                        const userObject = jsonformat(userData);
                                        // check type
                                        const checkuser = typeof userObject.check === 'object' && userData.check instanceof Array ?userData.check: [];
                                        const checkPosition = checkuser.indexOf(id);
                                        // remove the check array
                                        if(checkPosition > -1) {
                                            checkuser.splice(checkPosition , 1);
                                        };
                                        // resave user
                                        userObject.check = checkuser
                                        data.update('users',userObject.phone,userObject,(err7) => {
                                            if(!err7) {
                                                callBack(200)
                                            } else {
                                                callBack(500,{
                                                    error: "server error!"
                                                })
                                            }
                                        })
                                    }else {
                                        callBack(500, {
                                            error: "server error!"
                                        })
                                    }
                                })
                            }
                        })
                        
                    } else {
                        callBack(403, {
                            error: "Authentication failure!"
                        })
                    }
                })
            } else {
                callBack(400, {
                    error: "your delete request was not deleted!",
                });
            }
        });
    } else {
        callBack(400, {
            error: "your delete request was not deleted!",
        });
    }
};

module.exports = handler;
