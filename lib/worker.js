/*
*   title = root app that run the api 
*   description = 
*   author = Abu Sayed (pratice)
*   date = 11-01-22
*/

// defendences
const data = require('./data');


// scaffolding - object module
const worker = {};

// lookup all the cheacks
worker.geatherChecks = () => {
    // get all check
    data.list('checks', (err1,checks) => {
        if(!err1 && checks && checks.length > 0) {
            // pass the data to validated 
            console.log(hello)
        } else {
            console.log('error: could not find a check data')
        }
    })
}

// trimer all cheacks are excution per a time
worker.loop = () => {
    setInterval(() => {
        worker.geatherChecks();
    }, 1000 * 60);
}

// start the worker
worker.init= () => {
    console.log('start the worker');
    // excute all the checks
    worker.geatherChecks();
    // checks are loop
    // worker.loop();
}


module.exports = worker;
