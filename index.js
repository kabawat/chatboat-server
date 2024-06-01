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
const parseUserAgent = require('#root/src/services/parseUserAgent');
const { default: axios } = require('axios');
const port = process.env.PORT || 2917
const NodeGeocoder = require('node-geocoder');
const getAddress = require('#root/src/services/findLocation');
const get_request_infomation = require('./src/helper/browser/get_request_infomation');
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(
    { origin: "*" }
))
app.use(fileUpload())

// Middleware to block Postman in production
app.use((req, res, next) => {
    const userAgent = req.headers['postman-token'];
    const isProduction = process.env.ENVIRONMENT != 'dev';
    if (isProduction && userAgent) {
        res.status(403).send('Forbidden: Postman requests are not allowed');
    } else {
        next();
    }
});


app.get("/", (req, res) => {
    res.send(`<a href='https://kabawat.com'>welcome to kabawat studio</a> <script>window.location.href = "https://kabawat.com"</script>`)
})
app.use('/api', router)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

// server listen 
app.listen(port, () => {
    connectDB().then(() => {
        console.log('db connect')
    })
    console.log(`http://localhost:${port}/docs`)
})