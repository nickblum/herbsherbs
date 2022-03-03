const express = require('express')
const router = express.Router()

router.get(['/coop','/coop.json'],(req,res) => {
    if ( req.url.includes('.json') ){
        res.render('coop',{contentOnly:true},(error,html)=>{
            if ( error ) html = 'Error: Unable to retrieve data'
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ title: 'Chickens', html }));
        })
    } else {
        res.render('coop',{title:`Chickens` })
    }    
})

module.exports = router