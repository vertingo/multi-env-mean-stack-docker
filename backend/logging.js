
const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const dayjs = require('dayjs')

const dayJS = (day) => {
    day = day ? day : new Date()
    return dayjs(day).locale('th')
}

const createDir = (name) => {
    const createPath = path.join(name)
    if (!fs.existsSync(createPath)) {
        mkdirp.sync(createPath)
    }
}

class Logger {

     error(errorType, message){
        createDir('log/root')
        const pathLog = path.join(`log/root/${dayJS().format('YYYY-MM-DD')}-root.log`)
        const dataLog = `[ERROR] [${errorType.toUpperCase()}] ${message}`
        fs.writeFile(pathLog, dataLog + '\r\n', { flag: 'a' }, function (err) {
            if (err) return console.log(err)
        })
    }

}

module.exports = new Logger()