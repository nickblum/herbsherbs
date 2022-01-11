const express = require('express')
const rf24 = require('../rf24/interface')
const router = express.Router()

router.get('/coop',(req,res) => {
    res.render('coop',{title:`Chickens` })
})

router.get('/coop.json', (req,res) => {
    res.render('coop',{contentOnly:true},(error,html)=>{
        if ( error ) html = 'Error: Unable to retrieve data'
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ title: 'Chickens', html }));
    })
})

router.post('/coop', async (req,res) => {
    try {
        const ret = await rf24()
        console.log(ret)
        res.send('')
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
    
})

module.exports = router