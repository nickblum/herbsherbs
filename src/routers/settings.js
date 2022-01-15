const express = require('express')
//const MCU = require('../models/mcu')
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

router.post('/settings/mcu', async (req,res) => {
    try {
        //await MCU.create({title:'Chicken Coop', description:'',rf_channel:123})
        res.send('ok')
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router