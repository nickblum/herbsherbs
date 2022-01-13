const { PythonShell } = require('python-shell')

const doAction = (nodeID,actionID=0) => {
    /**
     * Need to verify node & action ID
     * get associated rf channel, etc. needed to build transmission args
     */

    return new Promise((resolve, reject) => {
        const options = {scriptPath:__dirname+'/py/', args:[nodeID,actionID]}
        PythonShell.run('transmit.py', options, function (err, results) {
            if (err) reject(err)
            // results is an array consisting of messages collected during execution
            resolve(results)
        })
    })
}

module.exports = doAction