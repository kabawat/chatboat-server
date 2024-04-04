require('dotenv').config() // Import the dotenv module to load environment variables from a.env file
const expree = require('express')
const connectDB = require('#config/databaseConfig')
const router = require('#routers/index')
const app = expree()
const { PORT } = process.env
connectDB()  // Call the connectDB function to connect to the database
app.use('/api', router);
// Start the Express.js application listening on the specified port
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})