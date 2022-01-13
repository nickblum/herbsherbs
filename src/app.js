const express = require('express')
const path = require('path')
const hbs = require('hbs')
const coopRouter = require('./routers/coop')
const settingsRouter = require('./routers/settings')
const rf24Router = require('./routers/rf24')

// Database
const db = require('./db/database');
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('DB Error: ' + err))

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.use(express.json())
app.set('view engine','hbs')
app.set('views',viewsPath)
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsPath)

/**
 * Routing
 */
app.use(coopRouter)
app.use(settingsRouter)
app.use(rf24Router)
app.get('',(req,res)=>{
    res.render('homestead',{title:'Homestead'})
})
app.get('/.json',(req,res)=>{
    res.render('homestead',{contentOnly:true},(error,html)=>{
        if ( error ) html = 'Error: Unable to retrieve data'
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ title: 'Homestead', html }));
    })
})
app.get('*',(req,res)=>{
    res.render('error404')
})

app.listen(port,()=>{
    console.log('App is running on port ' + port);
})