const express = require('express')
const connectDB = require('./config/db')
const dotenv = require('dotenv')

dotenv.config()
connectDB() // Connection to database
const app = express() // Instance of server 

// Middlewear
app.use(express.json()) // Conversion fron JSON to JavaScript object

// Routes


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})