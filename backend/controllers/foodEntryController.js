const FoodEntry = require('../models/FoodEntry')

const getFoodEntries = async (req, res) => {
  try {
    const result = await FoodEntry.find({ mealId: req.params.mealId })
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const createFoodEntry = async (req, res) => {
  try {
    const {name, weight, kcalPer100g} = req.body
    if(!name || !weight || !kcalPer100g) {
      return res.status(400).json({ message: 'All fieldsare required' })
    }
    const calculatedCalories = (req.body.weight * req.body.kcalPer100g) / 100
    const result = await FoodEntry.create({...req.body, mealId: req.params.mealId, calculatedCalories})
    res.status(201).json(result)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const updateFoodEntry = async (req, res) => {
  try {
    if(Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'No fields to update' })
    }
    const existing = await FoodEntry.findById(req.params.id)
    if(!existing) return res.status(404).json({ message: 'Food entry not found' })
    
    const weight = req.body.weight ?? existing.weight
    const kcalPer100g = req.body.kcalPer100g ?? existing.kcalPer100g

    const calculatedCalories = (weight * kcalPer100g) / 100
    const result = await FoodEntry.findByIdAndUpdate(req.params.id,{...req.body, calculatedCalories}, { new: true })
    if(!result) return res.status(404).json({ message: 'Food entry not found' })
    res.status(200).json(result)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const deleteFoodEntry = async (req, res) => {
  try {
    const result = await FoodEntry.findByIdAndDelete(req.params.id)
    if(!result) return res.status(404).json({ message: 'Food entry not found' })
    res.status(200).json(result)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
module.exports = {getFoodEntries, createFoodEntry, updateFoodEntry, deleteFoodEntry}