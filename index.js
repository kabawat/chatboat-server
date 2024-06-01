const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const swaggerUi = require('swagger-ui-express');
const app = express()
const fileUpload = require('express-fileupload')
const path = require('path')
const dot = require('dotenv').config()
const connectDB = require('#config/databaseConfig')
const router = require('#routers/index');
const cors = require('cors');
const specs = require('./swagger');
const port = process.env.PORT || 2917
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(
    { origin: "*" }
))
app.use(fileUpload())
app.get("/", (req, res) => {
    res.send(`<a href='https://kabawat.com'>welcome to kabawat studio</a> <script>window.location.href = "https://kabawat.com"</script>`)
})
app.use('/api', router)

app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

app.get('/test', (req, res) => {
    // Extract headers
    const headers = req.headers;

    // Extract device information
    const userAgent = headers['user-agent'];
    const os = headers['sec-ch-ua-platform'];
    const ip = req.ip; // Extract IP address
    const timestamp = new Date().toISOString(); // Current time

    // Assuming you have a location service to get the user's location
    const location =""; // Function to get user's location

    // Construct the response object
    const deviceInfo = {
        browser: userAgent,
        os: os,
        time: timestamp,
        location: location,
        ip_address: ip
    };

    // Respond with the device information
    res.json(deviceInfo);
});

// server listen 
app.listen(port, () => {
    connectDB().then(() => {
        console.log('db connect')
    })
    console.log(`http://localhost:${port}/docs`)
})