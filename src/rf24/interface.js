const { PythonShell } = require('python-shell')

const doAction = (mcuID,mcuAction=0,mcuArg=0) => {
    return new Promise((resolve, reject) => {
        if (isNaN(mcuID) || mcuID <= 0 || isNaN(mcuAction) || isNaN(mcuArg) ){
            reject("Bad request: Please verify your MCU arguments")
        }

        const options = {
            scriptPath:__dirname+'/py/', 
            args:[mcuID,mcuAction,mcuArg],
            mode: 'json'
        }
        PythonShell.run('rf24.py', options, function (err, results) {
            if (err) reject(err)
            resolve(results)
        })
    })
}

module.exports = doAction