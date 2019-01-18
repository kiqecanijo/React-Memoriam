var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)

io.on('connection', function(socket) {
  socket.on('chat message', function({ message, name }) {
    let when = new Date()
    when = `${when.getHours()}:${when.getMinutes()}`
    io.emit('chat message', `${when} ${name} say: ${message}`)
  })

  socket.on('disconnect', function() {
    console.log(`good bye user : ${socket.id}`)
  })
})

const port = 3001
http.listen(port, function() {
  console.log(`listening on *:${port}`)
})
