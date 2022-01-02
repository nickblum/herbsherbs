const express = require('express')
const router = express.Router()

router.get('/coop', (req,res) => {
    res.render('coop',{title:`Chickens`})
})
router.get('/ajax_coop', (req,res) => {
    res.render('ajax_coop',(error,html)=>{
        if ( error ) html = 'Error: Unable to retrieve data'
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ title: 'Chickens', html }));
    })
})

router.post('/coop', (req,res) => {
    res.send('send command to coop controller')
})

module.exports = router