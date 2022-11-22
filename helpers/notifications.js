/*
*   title = notifications
*   description = all importents notfication utilities are here
*   author = Abu Sayed (pratice)
*   date = 11-22-22
*/

// defendencies
const https = require('https');
const {twilio} = require('./enviroments');
const queryString = require('querystring')



// scaffolding object
const notifications = {};

// send sms to twilio api
notifications.sendTwilioSms = (phone, msg, callback) => {
    // checking phone msg are ok!
    const phone = typeof phone === 'string' && phone.trim().length === 11 ? phone.trim() : false;
    const msg = typeof msg === 'string' && msg.trim().length > 0 && msg.trim().length <=1600? msg.trim() : false;

    if(phone && msg) {
        
        // confiqure the request payload
        const payload = {
            from: twilio.from,
            to:`+88${phone}`,
            body: msg
        };

        // stringfy the payload
        const stringfyPayload = queryString.stringify(payload);

        // confiqure the request object
        const requestObject = {
            hostName: api.twilio.com,
            method: POST,
            path: `2010-04-01/Accounts/${twilio.accountSid}/Messages.json`,
            auth: `${twilio.accountSid}:${twilio.authToken}`,
            headers: {
                'Content-type': 'applications/x-www-from-urlencoded'
            }
        };


        // instantiate the request object
        const req = https.request(requestObject, (res) => {
            // initiate response code
            const statusCode = res.statusCode

            // checking code is true & 
            if(statusCode === 200 || statusCode === 201) {
                callback(false)
            } else {
                callback(`status code was returnd ${statusCode}`)
            }
        })
    }else {
        callback('Given parameters wherer missing or invalid!')
    }
};

// export to use twilio
module.exports = notifications;