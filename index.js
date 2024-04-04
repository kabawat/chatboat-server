require('dotenv').config() // Import the dotenv module to load environment variables from a.env file
const expree = require('express')
const connectDB = require('#config/databaseConfig')
const router = require('#routers/index')
const app = expree()
const { PORT } = process.env
connectDB()

app.use(expree.json()) // Parse incoming requests data as JSON
app.use(expree.urlencoded({ extended: true })) //Parse
app.use('/api', router) // Set up our API endpoint, which points to the
// Start the Express.js application listening on the specified port
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})