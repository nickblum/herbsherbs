const express = require('express')
//const MCU = require('../models/mcu')
const router = express.Router()

const { Model } = require('objection')
const MCU = require('../models/MCU')
const knex = require('../db/database')
//Model.knex(knex);

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

// get all MCUs and corresponding actions a json obj
router.get('/settings/mcu.json', async (req,res) => {
    try {
        //const mcus = await MCU.query()
        const query = MCU.relatedQuery('actions').for(1)
        const actions = await query

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(actions));
    } catch(e) {
        console.log(e)
        res.status(500).send()
    }
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