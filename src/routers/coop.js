const express = require('express')
const router = express.Router()

router.get('/coop', (req,res) => {
    res.send('get coop controller status')
})

router.post('/coop', (req,res) => {
    res.send('send command to coop controller')
})

module.exports = router