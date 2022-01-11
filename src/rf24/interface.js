const { PythonShell } = require('python-shell')

const transmit = () => {
    return new Promise((resolve, reject) => {
        const options = {scriptPath:__dirname+'/py/', args:[1234,'openCoopDoor']}
        PythonShell.run('test.py', options, function (err, results) {
            if (err) reject(err)
            // results is an array consisting of messages collected during execution
            resolve(results)
      })

    })
}

module.exports = transmit