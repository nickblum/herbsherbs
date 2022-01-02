const express = require('express')
const router = express.Router()

router.get('/settings', (req,res) => {
    res.render('settings',{title:`Settings`})
})
router.get('/ajax_settings', (req,res) => {
    res.render('ajax_settings',(error,html)=>{
        if ( error ) html = 'Error: Unable to retrieve data'
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ title: 'Settings', html }));
    })
})

router.post('/settings', (req,res) => {
    res.send('post settings!')
})

module.exports = router