require('dotenv').config()
const expree = require('express')
const app = expree()
const { PORT } = process.env

app.listen(PORT, () => {
    console.log(`http:localhost:${PORT}`)
})