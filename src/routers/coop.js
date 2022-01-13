const express = require('express')
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

module.exports = router