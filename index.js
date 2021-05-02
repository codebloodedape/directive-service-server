const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 3000
const auth = require('./src/handlers/auth')
const RequestHandler = require('./src/handlers/handler')

app.use(cors())
app.use(bodyParser.json());
app.use(auth.authenticateRequest)

app.get('/', (req, res) => {
    res.redirect('/folder');
})

// app.get('/test', handler.test)

app.get('/login', RequestHandler.init)
// app.get('/logout', RequestHandler.unauthenticateGuest)
app.put('/folder', RequestHandler.putFolder)
app.get('/folder/:id?', RequestHandler.getFolder)
app.post('/folder/:id?', RequestHandler.updateFolder)
app.delete('/folder/:id?', RequestHandler.deleteFolder)

app.listen(port, () => {
    console.log(`App started: http://localhost:${port}`)
})