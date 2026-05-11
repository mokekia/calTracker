const User = require('../models/User')
const Meal = require('../models/Meal')

const getCaloriesToday = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    if(!user) return res.status(404).json({ message: 'User not found' })
    const today = new Date()
    today.setUTCHours(0, 0, 0, 0) // Beggining of the day
    const tomorrow = new Date(today)
    tomorrow.setUTCDate(today.getDate() + 1) // End of the day

    const meals = await Meal.find({ 
      userId: req.params.userId,
      date: { $gte: today, $lt: tomorrow } // $gte: greater than or equal to & lt: less than
     })
     console.log('today: ', today)
     console.log('tomorrow: ', tomorrow)
     console.log('meals found: ', meals)
    const caloriesEaten = meals.reduce((sum, meal) => sum + meal.totalCalories, 0)
    const caloriesLeft = user.dailyCalorieGoal - caloriesEaten
    res.status(200).json({caloriesEaten, dailyCalorieGoal: user.dailyCalorieGoal, caloriesLeft})
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
module.exports = {getCaloriesToday}