const express = require('express')
const path = require('path')
const hbs = require('hbs')
const coopRouter = require('./routers/coop')
const settingsRouter = require('./routers/settings')
const rf24Router = require('./routers/rf24')

const app = express()

const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.use(express.json())
app.set('view engine','hbs')
app.set('views',viewsPath)
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsPath)

/**
 * DB Connect 
 */
const { Model } = require('objection')
const MCU = require('./models/MCU')
const knex = require('./db/database')
const { groupByKey } = require('./utils/utils')
Model.knex(knex);

/**
 * Routing
 */
app.use(coopRouter)
app.use(settingsRouter)
app.use(rf24Router)

// Homestead Homepage
app.get(['','/.json'], async (req,res)=>{

    const query = await MCU.query()
        .select('mcus.description AS mcu','actions.*')
        .joinRelated('actions')
    
    const {groupByKey} = require('./utils/utils')
    console.log(groupByKey(query,'mcu'))


    if ( req.url.includes('.json') ){
        res.render('homestead',{contentOnly:true},(error,html)=>{
            if ( error ) html = 'Error: Unable to retrieve data'
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ title: 'Homestead', html }));
        })
    } else {
        res.render('homestead',{title:'Homestead'})
    }
})

app.get('*',(req,res)=>{
    res.render('error404')
})

module.exports = app