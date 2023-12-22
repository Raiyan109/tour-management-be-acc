const express = require('express');
const { getAllTours, createTour } = require('../controllers/tour.controller');

const router = express.Router()

router.get('/', getAllTours)
router.post('/create', createTour)


module.exports = router

