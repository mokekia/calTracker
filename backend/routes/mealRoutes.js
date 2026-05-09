const express = require('express')
const router = express.Router()

const { getMeals, getAllMealsByDate, createMeal, updateMeal, deleteMeal } = require('../controllers/mealController')

router.get('/:userId', getMeals)
router.get('/:userId/:date', getAllMealsByDate)
router.post('/:userId', createMeal)
router.put('/:id', updateMeal)
router.delete('/:id', deleteMeal)

module.exports = router