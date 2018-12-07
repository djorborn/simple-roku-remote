const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

const {Client, keys} = require('roku-client')

app.get('/', (req, res, next) => {
    res.sendFile(__dirname + '/index.html')
})

Client.discover().then((client) => {
    io.on('connection', (socket) => {
        console.log('Socket Connected')
        socket.on('key', (key) => {
            // console.log(key)
            
            client.keypress(keys[key])
        })
    })
    return client.apps()
}).then ((apps) => {
    app.get('/apps', (req, res) => {
        res.json(apps)
    })
})






http.listen(3000);