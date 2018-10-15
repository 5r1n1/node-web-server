const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const app = express()
const port = 3000

app.set('view engine', 'hbs')
hbs.registerPartials (__dirname + '/views/partials')
hbs.registerHelper ('currYear', () => new Date().getFullYear())
hbs.registerHelper ('caps', (text) => typeof text === 'string' ? text.toUpperCase() : text)

app.use ((req, res, next) => {
    logEntry = `${Date()}: ${req.method} ${req.url}`
    console.log (logEntry )
    fs.appendFile('server.log', logEntry + '\n', err => {
        if (err) console.log ('Unable to write to server.log', err.message)
    })
    next()
})

app.use ((req, res, next) => res.render('maint.hbs'))

app.use (express.static(__dirname + '/public'))

app.get('/', (req, res) => res.render('home.hbs', {pageTitle:'Home Page', welcomeMessage: 'Welcome!!'}))
app.get('/about', (req, res) => res.render('about.hbs', {pageTitle:'About Page'}))
app.get('/superman', (req, res) => res.send('<h1><center>Hello Superman!</center></h1>'))
app.get('/batman', (req, res) => res.send({name: 'batman', age: 41, hobbies: ['eating', 'sleeping', 'snoring']}))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))