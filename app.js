const express = require('express')

const app = express()
app.use(express.static(__dirname+'/client'))

const http = require('http')
const server = http.createServer(app)

const port = process.env.PORT || 3000

app.get('/*', (req, res) => {
    res.sendFile('./client/index.html', {root: './'})
    res.redirect('./')
})

server.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})