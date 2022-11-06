/*
*   title = not found handler
*   description = 404 not found handler
*   author = Abu Sayed (pratice)
*   date = 11-01-22
*/

// defendanceis
const fs = require('fs');
const path = require('path');


// module object --scaffolding
const lib = {};

// basedir of all directory
lib.basedir = path.join(__dirname, '../.data/');

// file write
lib.create = (dir, file, data, callback) => {
    // file open for writing
    fs.open(`${lib.basedir + dir}/${file}.json`, 'wx', (err, fileDriscreptor) => {
        // data do string
        const dataString = JSON.stringify(data);
        if (!err && fileDriscreptor) {
            fs.writeFile(fileDriscreptor, dataString, (err2) => {
                if (!err2) {
                    fs.close(fileDriscreptor, (err3) => {
                        if (!err3) {
                            callback(false)
                        } else {
                            callback('error of file clossed')
                        }
                    })
                } else {
                    callback(`file isn't writeFile, ${err2}`)
                }
            })
        } else {
            callback(err)
        }
    })
}

// file read
lib.read = (dir, file, callback) => {
    fs.readFile(`${lib.basedir + dir}/${file}.json`, 'utf8', (err, data) => {
        if (!err) {
            console.log(data)
        } else {
            console.log(err)
        }
    });
}

// file update
lib.update = (dir, file, data, callback) => {
    fs.open(`${lib.basedir + dir}/${file}.json`, 'r+', (err, fileDriscreptor) => {
        if (!err && fileDriscreptor) {
            // stringdata from data
            const stringdata = JSON.stringify(data);

            // truncate the file
            fs.ftruncate(fileDriscreptor, (err2) => {
                if (!err2) {
                    fs.writeFile(fileDriscreptor, stringdata, (err3) => {
                        if (!err3) {
                            fs.close(fileDriscreptor, (err4) => {
                                if (!err4) {
                                    callback(false)
                                } else {
                                    callback('file not clossed')
                                }
                            })
                        }
                    })
                } else {
                    callback('no clear exist file for update write')
                }
            })
        } else {
            callback('Update error , file may exists')
        }
    })
}

// existing file delete
lib.delete =  (dir, file, callback) => {
    fs.unlink(`${lib.basedir + dir}/${file}.json`, (err) => {
        if(!err) {
            callback(false)
        } else {
            callback('error of deleted')
        }
    })
}


// export
module.exports = lib;

