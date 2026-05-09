const mongoose = require('mongoose')

const foodEntrySchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  weight: {
    type: Number,
    required: true,
    min: 0
  },
  kcalPer100g: {
    type: Number,
    required: true,
    min: 0
  },
  calculatedCalories: {
    type: Number,
    min: 0
  },
  mealId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Meal",
    required: true
  },
  isQuickAdd: {
    type: Boolean,
    default: false
  }
})
module.exports = mongoose.model("FoodEntry", foodEntrySchema)