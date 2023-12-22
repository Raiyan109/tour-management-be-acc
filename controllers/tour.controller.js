const Tour = require('../model/tour.model.js');

const createTour = async (req, res) => {
    const { name, price, featured, rating, location } = req.body

    const tour = await Tour.create({ name, price, featured, rating, location })

    if (!tour) {
        return res.status(404).json({
            success: false,
            message: 'No tour can be created'
        })
    }

    res.status(200).json({
        success: true,
        data: tour
    })
}

const getAllTours = async (req, res) => {
    console.log(req.query);
    const queries = {}

    if (req.query.page) {
        const { page = 1, limit = 3 } = req.query

        const skip = (page - 1) * parseInt(limit)
        queries.skip = skip;
        queries.limit = parseInt(limit)
    }

    const tours = await Tour.find()
        .skip(queries.skip)
        .limit(queries.limit)
    const totalTours = await Tour.countDocuments()

    if (!tours) {
        return res.status(404).json({
            success: false,
            message: 'No tour found'
        })
    }



    res.status(200).json({
        success: true,
        total: totalTours,
        data: tours
    })
}

module.exports = { getAllTours, createTour }