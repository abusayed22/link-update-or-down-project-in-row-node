/*
*   title = enviroments
*   description = all enviroments setup here
*   author = Abu Sayed (pratice)
*   date = 12-03-22
*/

// dependcies

// module scaffolding
const enviroments = {};


enviroments.developing = {
    port: 3000,
    envName: 'developing',
    hashingKey: 'taebsctd',
    maxCheck: 5,
    twilio: {
        from: '01911710646',
        accountSid: 'AC3560425ff298b12ed96e3398c0c01fa6',  
        authToken: '19e6883c8da820836b4f2a634e7e64a8' 
    }
}
enviroments.production = {
    port: 5000,
    envName: 'production',
    hashingKey: 'parbocsdoenfaglk',
    maxCheck: 5,
    twilio: {
        from: '68987566',
        accountSid: 'AC3560425ff298b12ed96e3398c0c01fa6',  
        authToken: '19e6883c8da820836b4f2a634e7e64a8' 
    }
}

// detarmind which enviroment was passed
const currentEnviroment = typeof (process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV : 'developing'

// export corressponding enviroment object
const enviromentTOExport = typeof (enviroments[currentEnviroment]) === "object" ? enviroments[currentEnviroment] : enviroments.developing

// export 
module.exports = enviromentTOExport;