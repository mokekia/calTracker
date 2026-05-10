const Meal = require('../models/Meal')

const getMeals = async (req, res) => {
  try {
    const result = await Meal.find({ userId: req.params.userId })
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getAllMealsByDate = async (req, res) => {
  try {
    const result = await Meal.find({ userId: req.params.userId, date: req.params.date })
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const createMeal = async (req, res) => {
  try {
    const result = await Meal.create(req.body)
    res.status(201).json(result)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

const updateMeal = async (req, res) => {
  try {
    const result = await Meal.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if(!result) return res.status(404).json('Meal not found')
    res.status(200).json(result)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const deleteMeal = async (req, res) => {
  try {
    const result = await Meal.findByIdAndDelete(req.params.id)
    if(!result) return res.status(404).json('Meal not found')
    res.status(200).json({ message: 'Meal deleted!' })
    } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {getMeals, getAllMealsByDate, createMeal, updateMeal, deleteMeal}