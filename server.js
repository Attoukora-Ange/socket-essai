const express = require('express')
const path = require('path')
const app = express()

const server = require('http').Server(app);
const Server = require('socket.io').Server;
const io = new Server(server);

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(express.static(path.join('public')))

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'index.html'))
})
 
io.on('connection', (socket)=>{
    console.log(socket.id + ' est utilisateur est connecté...')
    socket.on('salle', data =>{
        socket.join(data)
        console.log(socket.rooms)
    })
    socket.on('message', (message)=>{
        const mes = {
            message,
            id : socket.id
        }
      
        io.emit('message_client', mes)
    })
    socket.on('disconnect', ()=>{
        console.log(socket.id + ' est déconnecté') 
    })
})


const port = 3000
server.listen(port, () => console.log(`Example app listening on port ${port}!`))