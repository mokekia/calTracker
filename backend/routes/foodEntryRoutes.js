const express = require('express')
const router = express.Router()

const {getFoodEntries, createFoodEntry, updateFoodEntry, deleteFoodEntry} = require('../controllers/foodEntryController')

router.get('/:mealId', getFoodEntries) // Get all food entries for a meal
router.post('/:mealId', createFoodEntry) // Create food entry
router.put('/:id', updateFoodEntry) // Update a food entry
router.delete('/:id', deleteFoodEntry) // delete a food entry

module.exports = router