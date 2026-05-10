const mongoose = require('mongoose')
const dotenv = require('dotenv')
const User = require('./models/User')
const Meal = require('./models/Meal')
const FoodEntry = require('./models/FoodEntry')

dotenv.config()
const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_URL)
    console.log('Connecte to MongoDB')

    // Deletes current data
    await User.deleteMany()
    await Meal.deleteMany()
    await FoodEntry.deleteMany()

    const users = await User.insertMany([
      {name: 'Alex', weight: 75, height: 178, age: 25, gender: 'male', activityLevel: 'sedentary', goal: -0.5, dailyCalorieGoal: 1900},
      {name: 'Sara', weight: 62, height: 165, age: 28, gender: 'female', activityLevel: 'lightly_active', goal: 0, dailyCalorieGoal: 2100},
      {name: 'Erik', weight: 90, height: 185, age: 32, gender: 'male', activityLevel: 'moderately_active', goal: -0.8, dailyCalorieGoal: 2400},
      {name: 'Lisa', weight: 55, height: 160, age: 22, gender: 'female', activityLevel: 'highly_active', goal: 0.5, dailyCalorieGoal: 2800},
      {name: 'Karim', weight: 80, height: 180, age: 30, gender: 'male', activityLevel: 'lightly_active', goal: 0, dailyCalorieGoal: 2500}
    ])

    const meals = await Meal.insertMany([
    { mealType: 'breakfast', date: '2024-01-15', userId: users[0].id, totalCalories: 450},
    { mealType: 'lunch', date: '2024-01-15', userId: users[1].id, totalCalories: 600},
    { mealType: 'dinner', date: '2024-01-15', userId: users[2].id, totalCalories: 800},
    { mealType: 'snacks', date: '2024-01-15', userId: users[3].id, totalCalories: 200},
    { mealType: 'lunch', date: '2024-01-15', userId: users[4].id, totalCalories: 700}
    ])

    const foodentries = await FoodEntry.insertMany([
      {name: 'Oatmeal', weight: 80, kcalPer100g: 350, calculatedCalories: 280, isQuickAdd: false, mealId: meals[0].id},
      {name: 'Chicken breast', weight: 200, kcalPer100g: 165, calculatedCalories: 330, isQuickAdd: false, mealId: meals[1].id},
      {name: 'Pasta', weight: 150, kcalPer100g: 370, calculatedCalories: 555, isQuickAdd: false, mealId: meals[2].id},
      {name: 'Protein bar', weight: 1, kcalPer100g: 280, calculatedCalories: 280, isQuickAdd: true, mealId: meals[3].id},
      {name: 'Rice', weight: 180, kcalPer100g: 350, calculatedCalories: 630, isQuickAdd: false, mealId: meals[4].id}
    ])
    console.log('Database seeded')
    process.exit(0)

  } catch (error) {
      console.log(error)
      process.exit(1)
  }
}
seedDatabase()