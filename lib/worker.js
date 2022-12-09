/*
*   title = root app that run the api 
*   description = 
*   author = Abu Sayed (pratice)
*   date = 11-01-22
*/

// defendences
const url = require('url')
const { jsonformat } = require('../helpers/utilities/utilities');
const data = require('./data');
const {sendTwilioSms} = require('../helpers/notifications')


// scaffolding - object module
const worker = {};



// lookup all the cheacks
worker.geatherChecks = () => {

    // get all check
    data.list('checks', (err1, check) => {
        if (!err1 && check && check.length > 0) {
            check.foreach(che => {
                data.read('checks', che, (err2, originalCheak) => {
                    if (err2 && originalCheak) {
                        worker.valditionCheakData(jsonformat(originalCheak))
                    }
                })
            })
            // pass the data to validated 
            console.log(hello)
        } else {
            console.log('error: could not find a check data')
        }
    })
};

// validate cheak data
worker.valditionCheakData = (originalCheak) => {
    if (originalCheak && originalCheak.id) {

        originalCheak.state = typeof originalCheak.state === 'string' && ['up', 'down'].indexOf(originalCheak.state).length > -1 ? originalCheak.state : 'down';

        originalCheak.lastCheck = typeof originalCheak.lastCheck === 'number' && originalCheak.lastCheck > 0 ? originalCheak.lastCheck : false;

        worker.perfromCheck(originalCheak)
    } else {
        console.log('error: check was invalid or not properly inputed!')
    }
};

// worker perfromed the checking
worker.perfromCheck = (originalCheak) => {

    // prepare to checkout come
    const checkOutCome = {
        error: false,
        responseCode: false
    };

    // mark the outcome has not been sent yet
    let outcomeSent = false;

    const parseUrl = url.parse(`${originalCheak.protocol}//${originalCheak.url}`, true);
    const hostName = parseUrl.hostname;
    const { path } = parseUrl;

    // construct the req
    const requestDetails = {
        protocol: `${originalCheak.protocol}`,
        hostName,
        url: `${url}`,
        method: originalCheak.method.toUpperCase(),
        path,
        timeout: originalCheak.timeSecends * 1000
    };
    const protocolToUse = originalCheak.protocol === 'http' ? 'http' : 'https';

    const req = protocolToUse.request(requestDetails, res => {
        // grab the status of the response
        const status = res.statusCode
        checkOutCome.responseCode = status;

        if (!checkOutCome) {
            worker.proccessCheckOutCome(originalCheak, checkOutCome);
            outcomeSent = true;
        };

        res.on('error', (e) => {
            checkOutCome = {
                error: true,
                value: e
            };
            // update the check outcome and pass to the next process
            if (!outcomeSent) {
                worker.proccessCheckOutCome(originalCheckData, checkOutCome);
                outcomeSent = true;
            }
        });
        
        res.on('timeout', () => {
            checkOutCome = {
                error: false,
                value: timeout
            };
            // update the check outcome and pass to the next process
            if (!outcomeSent) {
                worker.proccessCheckOutCome(originalCheckData, checkOutCome);
                outcomeSent = true;
            }
        });
        
        res.end()
    })
};



worker.proccessCheckOutCome = (originalCheckData, checkOutCome) => {
    // check if check outcome is up or down
    const state = !checkOutCome.error && checkOutCome.responseCode && originalCheckData.successCodes.indexOf(checkOutCome.responseCode) > -1 ? 'up': 'down'; 

    // decide whether we should alert the user or not
    const alertWanted = !!(originalCheckData.lastCheck && originalCheckData.state !== state);

    // update the check data 
    let newCheckData = originalCheckData
    newCheckData.state = state;
    newCheckData.lastCheck = Date.now();

    // update the check data to disk 
    data.update('checks',newCheckData.id,newCheckData , (err) => {
        if(!err) {
            // next proccess
            if(alertWanted) {
                worker.alertUserToStatusChange(newCheckData)
            }else {
                console.log('Alert is not needed as there is no state change!');
            }
        } else {
            console.log('error trying to save check data of one of the checks!')
        }
    })
};

// alert user to status change
worker.alertUserToStatusChange = (newCheckData) => {
    const msg = `Alert your check for ${newCheckData.method.toUpperCase()} ${newCheckData.protocol}//:${newCheckData.url}  is currenty ${newCheckData.state}`

    sendTwilioSms(newCheckData.userPhone,msg, (err) => {
        if(!err) {
            console.log(`User was alerted to a status change via SMS: ${msg}`);
        }else {
            console.log('There was a problem in send msg one of the user!')
        }
    })
};

// trimer all cheacks are excution per a time
worker.loop = () => {
    setInterval(() => {
        worker.geatherChecks();
    }, 5000);
    // }, 1000 * 60);
}

// start the worker
worker.init = () => {
    console.log('start the worker');
    // excute all the checks
    worker.geatherChecks();
    // checks are loop
    // worker.loop();
}


module.exports = worker;
