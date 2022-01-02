const express = require('express')
const path = require('path')
const hbs = require('hbs')
const coopRouter = require('./routers/coop')
const settingsRouter = require('./routers/settings')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewsPath)
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsPath)

/**
 * Routing
 */
app.use(coopRouter)
app.use(settingsRouter)
app.get('',(req,res)=>{
    res.render('index',{title:`Homestead`})
})
app.get('/homestead',(req,res)=>{
    res.render('index',{title:`Homestead`})
})
app.get('*',(req,res)=>{
    res.render('error404')
})

app.listen(port,()=>{
    console.log('App is running on port ' + port);
})