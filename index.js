const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const app = express()
// const { userModal } = require('./controller')
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const path = require('path')
const dot = require('dotenv').config()
const connectDB = require('#config/databaseConfig')
const router = require('#routers/index');
const cors = require('cors')
const port = process.env.PORT || 2917
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(
    { origin: "*" }
))
app.use(bodyParser.json())
app.use(fileUpload())
app.get("/", (req, res) => {
    res.send(`<a href='https://kabawat.com'>welcome to kabawat studio</a> <script>window.location.href = "https://kabawat.com"</script>`)
})
app.use('/api', router)

// server listen 
app.listen(port, async () => {
    await connectDB()
    console.log(`http://localhost:${port}`)
})