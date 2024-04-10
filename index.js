require('dotenv').config() // Import the dotenv module to load environment variables from a.env file
const expres = require('express')
const { createServer } = require("http");
const { Server } = require("socket.io");
const fileUpload = require('express-fileupload')
const cors = require('cors')
const connectDB = require('#config/databaseConfig')
const router = require('#routers/index')
const app = expres()

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000"
    }
});

const { PORT } = process.env || 2917
connectDB()
app.get("/", (req, res) => {
    res.send(`<a href='https://kabawat.com'>welcome to kabawat studio</a>`)
})
app.use(expres.json()) // Parse incoming requests data as JSON
app.use(expres.urlencoded({ extended: true }))
app.use(cors())
app.use(fileUpload())
app.use('/api', router) // Set up our API endpoint, which points to the

let connectedClients = {};
io.on("connection", (socket) => {
    console.log(socket.id)
    socket.on('login', (username) => {
        connectedClients[socket.id] = username;
        console.log(`${username} online`);
    });

    // Listen for disconnect event
    socket.on('disconnect', () => {
        if (connectedClients[socket.id]) {
            console.log(`${connectedClients[socket.id]} disconnected.`);
            delete connectedClients[socket.id];
        }
    });
});

httpServer.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})