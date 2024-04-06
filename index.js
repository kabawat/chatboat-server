require('dotenv').config() // Import the dotenv module to load environment variables from a.env file
const expres = require('express')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const connectDB = require('#config/databaseConfig')
const router = require('#routers/index')
const app = expres()
const { PORT } = process.env
connectDB()

app.use(expres.json()) // Parse incoming requests data as JSON
app.use(expres.urlencoded({ extended: true }))
app.use(cors())
app.use(fileUpload())
app.use('/api', router) // Set up our API endpoint, which points to the
// Start the Express.js application listening on the specified port
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})