const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 3000
// const myLogger = require('./src/handlers/handler')
const RequestHandler = require('./src/handlers/handler');
const handler = new RequestHandler.RequestHandler()

// var myLogger = function (req, res, next) {
//     console.log('LOGGED')
//     next()
// }

// app.use(handler.myLogger)
app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.redirect('/folder');
})

app.get('/test', handler.test)

app.get('/folder/:id?', handler.getChildren)
app.post('/folder/:id?', handler.putChild)

app.listen(port, () => {
    console.log(`App started: http://localhost:${port}`)
})