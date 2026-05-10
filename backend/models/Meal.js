const mongoose = require('mongoose')

const mealSchema = mongoose.Schema({
  mealType: {
    type: String,
    required: true,
    enum: ["breakfast", "lunch", "dinner", "snacks"]
  },
  date: {
    type: Date,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, // ObjectId is the unique ID for a document
    ref: "User",
    required: true
  },
  totalCalories: {
    type: Number,
    required: true,
    min: 0
  }
})
module.exports = mongoose.model('Meal', mealSchema)