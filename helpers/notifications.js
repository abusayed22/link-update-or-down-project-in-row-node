/*
*   title = notifications
*   description = all importents notfication utilities are here
*   author = Abu Sayed (pratice)
*   date = 11-22-22
*/

// defendencies
const https = require('https');
const queryString = require('querystring');
const { error } = require('console');
const {twilio} = require('./enviroments')



// scaffolding object
const notifications = {};

// send sms to twilio api
notifications.sendTwilioSms = (phone, msg, callback) => {
    // checking phone msg are ok!
    const userPhone = typeof phone === 'string' && phone.trim().length === 11 ? phone.trim() : false;
    const userMsg = typeof msg === 'string' && msg.trim().length > 0 && msg.trim().length <=1600? msg.trim() : false;

    if(userPhone && userMsg) {
        
        // confiqure the request payload
        const payload = {
            from: twilio.from,
            to:`+88${userPhone}`,
            body: userMsg
        };

        // stringfy the payload
        const stringfyPayload = queryString.stringify(payload);

        // confiqure the request object
        const requestDetails = {
            hostname: 'api.twilio.com',
            method: 'POST',
            path: `/2010-04-01/Accounts/${twilio.accountSid}/Messages.json`,
            auth: `${twilio.accountSid}:${twilio.authToken}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };


        // instantiate the request object
        const req = https.request(requestDetails, (res) => {
            // initiate response code
            const statusCode = res.statusCode

            // checking code is true & 
            if(statusCode === 200 || statusCode === 201) {
                callback(false)
            } else {
                callback(`status code was returnd ${statusCode}`)
            }
        });

        req.on("error", (e) => {
            callback(e)
        });

        req.write(stringfyPayload);
        req.end();

    }else {
        // callback('Given parameters were missing or invalid!');
    }
};

// export to use twilio
module.exports = notifications;