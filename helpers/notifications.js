/*
*   title = notifications
*   description = all importents notfication utilities are here
*   author = Abu Sayed (pratice)
*   date = 11-22-22
*/

// defendencies
const https = require('https');



// scaffolding object
const notifications = {};

// send sms to twilio api
notifications.sendTwilioSms = (phone, msg, callback) => {
    // checking phone msg are ok!
    const phone = typeof phone === 'string' && phone.trim().length === 11 ? phone.trim() : false;
    const msg = typeof msg === 'string' && msg.trim().length > 0 && msg.trim().length <=1600? msg.trim() : false;

    
};

// export to use twilio
module.exports = notifications;