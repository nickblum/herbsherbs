const express = require('express')
const router = express.Router()

router.get('/settings', (req,res) => {
    res.render('settings',{title:`Settings`})
})

router.post('/settings', (req,res) => {
    res.send('post settings!')
})

module.exports = router