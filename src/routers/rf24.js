const express = require('express')
const rf24 = require('../rf24/interface')
const router = express.Router()

router.get('/rf24/:id',(req,res) => {
    res.send('getting status...')
})

router.post('/rf24', async (req,res) => {
    try {
        const nodeID = req.body.node_id
        const actionID = req.body.action_id

        const ret = await rf24(nodeID, actionID)
        console.log(ret)
        res.send(ret[0])
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
})

module.exports = router