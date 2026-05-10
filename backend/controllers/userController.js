const User = require('../models/User')

const getUsers = async (req, res) => {
  try {
    const result = await User.find()
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

const getUser = async (req, res) => {
  try {
    const result = await User.findById(req.params.id)
    if (!result) return res.status(404).json({ message: 'User not found' })
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

const createUser = async (req, res) => {
  try {
    const {name, weight, height, age, activityLevel, goal, gender} = req.body
    let BMR // Amount of calories needed to function when resting 
    if(gender === "male"){
      BMR = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
    }else{
      BMR = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age)
    }

    const activityLevels = {
      sedentary: 1.2,
      lightly_active: 1.375,
      moderately_active: 1.55,
      highly_active: 1.725
    }

    // Calculation of TDEE - the amount of calories that are consumed when activity level is considered
    const TDEE = BMR * activityLevels[activityLevel]
    const dailyCalorieGoal = Math.round(TDEE + (goal * 1100))

    const result = await User.create({...req.body, dailyCalorieGoal})
    res.status(201).json(result)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
}

const updateUser = async (req, res) => {
  try {
    const result = await User.findByIdAndUpdate(req.params.id, req.body, {new: true}) // new: true gives back the updated document 
    if (!result) return res.status(404).json({ message: 'User not found' })
    res.status(200).json(result)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
}

const deleteUser = async (req, res) => {
  try {
    const result = await User.findByIdAndDelete(req.params.id)
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

module.exports = {getUsers, getUser, createUser, updateUser, deleteUser}