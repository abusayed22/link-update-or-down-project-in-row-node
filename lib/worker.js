/*
*   title = root app that run the api 
*   description = 
*   author = Abu Sayed (pratice)
*   date = 11-01-22
*/

// defendences
const { jsonformat } = require('../helpers/utilities/utilities');
const data = require('./data');


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
    
}


// trimer all cheacks are excution per a time
worker.loop = () => {
    setInterval(() => {
        worker.geatherChecks();
    }, 1000 * 60);
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
