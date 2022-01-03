const express = require('express')
const router = express.Router()

router.get('/settings', (req,res) => {
    res.render('settings',{title:`Settings`})
})

router.get('/settings.json', (req,res) => {
    res.render('settings',{contentOnly:true},(error,html)=>{
        if ( error ) html = 'Error: Unable to retrieve data'
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ title: 'Settings', html }));
    })
})

router.post('/settings', (req,res) => {
    res.send('post settings!')
})

module.exports = router