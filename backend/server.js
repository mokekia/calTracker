const express = require('express')
const connectDB = require('./config/db')
const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config()
connectDB() // Connection to database
const app = express() // Instance of server 

// Middlewear
app.use(express.json()) // Conversion fron JSON to JavaScript object
app.use(cors())
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/meals', require('./routes/mealRoutes'))
app.use('/api/foodentries', require('./routes/foodEntryRoutes'))
app.use('/api/stats', require('./routes/statsRoutes'))

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})