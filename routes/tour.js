const express = require('express');
const { getAllTours, createTour, getSingleTour, getCheapestTour } = require('../controllers/tour.controller');

const router = express.Router()

router.get('/', getAllTours)
router.get('/cheapest', getCheapestTour)
router.get('/:id', getSingleTour)
router.post('/create', createTour)


module.exports = router

