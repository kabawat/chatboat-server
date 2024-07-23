const SECRET = require('./src/config/env.config');
const express = require('express')
const swaggerUi = require('swagger-ui-express');
const app = express()
const fileUpload = require('express-fileupload')
const connectDB = require('#config/databaseConfig')
const router = require('#routers/index');
const cors = require('cors');
const specs = require('./swagger');
const port = SECRET.PORT || 2917
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(
    { origin: "*" }
))
app.use(fileUpload())

// Middleware to block Postman in production
app.use((req, res, next) => {
    const userAgent = req.headers['postman-token'];
    const isProduction = SECRET.ENVIRONMENT != 'dev';
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