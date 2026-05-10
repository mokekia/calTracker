const express = require('express')
const router = express.Router()
const {getCaloriesToday} = require('../controllers/statsController')
router.get('/:userId/calories-today', getCaloriesToday)
module.exports = router