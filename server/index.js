const express = require('express')
const app = express()
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')

app.use(cors())

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", //port where the frontend is running
        methods: ['GET', 'POST'],
    }
})

server.listen(3001, () => console.log('Server running on port 3001'))

let cnt = 0;
io.on('connection', (socket) => {
    //console.log(`User ${socket.id} connected`)

    cnt++;
    if(cnt===1) {
        socket.emit('assignColor', {
            color: 'white',
        })
    } else {
        socket.emit('assignColor', {
            color: 'black',
        })
    }

    socket.on('move', ({sourceSquare, targetSquare}) => {
        socket.broadcast.emit('move', {
            sourceSquare,
            targetSquare
        })
        //console.log(sourceSquare, targetSquare)
    })

    socket.on('disconnect', () => {
        cnt = 0
        socket.broadcast.emit('message', {
            text: `Your opponent has disconnected`
        })
    })
})