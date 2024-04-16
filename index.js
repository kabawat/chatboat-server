const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const app = express()
// const { userModal } = require('./controller')
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const path = require('path')
const dot = require('dotenv').config()
// const connectDB = require('#config/databaseConfig')
// const router = require('#routers/index');
const socket_login = require('#src/socket/login');
const cors = require('cors')
const port = process.env.PORT || 2917
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(
    { origin: ['http://localhost:3000', 'https://query-boat.onrender.com', 'https://blissful-shadow-99347.pktriot.net'] }
))
app.use(bodyParser.json())
app.use(fileUpload())
app.get("/", (req, res) => {
    res.send(`<a href='https://kabawat.com'>welcome to kabawat studio</a>`)
})
// app.use('/api', router)


const server = http.createServer(app)
let connectedClients = {};
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000', 'https://query-boat.onrender.com', 'https://blissful-shadow-99347.pktriot.net']
    }
})

// socket data 
const startSocketServer = () => {
    io.on("connection", (socket) => {
        console.log("a user connected", socket.id);

        // Listen for login event
        socket.on('login', (data) => {
            console.log("data : ", data)
            connectedClients[socket.id] = data?.username;
            socket_login(socket, data)
        });

        // Listen for disconnect event
        socket.on('disconnect', () => {
            if (connectedClients[socket.id]) {
                console.log(`${connectedClients[socket.id]} disconnected.`);
                delete connectedClients[socket.id];
            }
        });
    });
};

// server listen 
server.listen(port, async () => {
    startSocketServer()
    // await connectDB()
    console.log(`http://localhost:${port}`)
})
