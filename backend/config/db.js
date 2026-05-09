const mongoose = require('mongoose') // Import mongoose
const dotenv = require('dotenv')  // Import dotenv

const connectDB = async () => { // Function to connect MongoDB to code 
  try {
    await mongoose.connect(process.env.CONNECTION_URL) // Connecting MongoDB to code
    console.log('MongoDB connected')
  } catch (error) {
    console.error(error.message)
    process.exit(1) // Closes the whole Node-process
  }
}
module.exports = connectDB // Exporting connectDB