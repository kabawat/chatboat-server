require('dotenv').config() // Import the dotenv module to load environment variables from a.env file
const express = require('express')
const { createServer } = require("http");
const { Server } = require("socket.io");
const fileUpload = require('express-fileupload')
const cors = require('cors')
const connectDB = require('#config/databaseConfig')
const router = require('#routers/index');
const socket_login = require('#src/socket/login');
const app = express()
const { PORT } = process.env || 2917
app.get("/", (req, res) => {
    res.send(`<a href='https://kabawat.com'>welcome to kabawat studio</a>`)
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: '*' }));

app.use(fileUpload())
app.use('/api', router) // Set up our API endpoint, which points to the
connectDB()
let connectedClients = {};
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: { origin: '*' }
});


httpServer.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})

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