const express = require('express')
const rf24 = require('../rf24/interface')
//const MCU = require('../models/mcu')
const router = express.Router()

router.get('/rf24/:id',(req,res) => {
    //res.send('getting status...')
})

router.post('/rf24', async (req,res) => {
    try {
        const mcuID = req.body.mcu_id || 0
        const mcuAction = req.body.mcu_action || 0
        const mcuArg = req.body.mcu_arg || 0

        const ret = await rf24(mcuID, mcuAction, mcuArg)
        console.log(ret)
        res.send(ret[0])
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
})

module.exports = router