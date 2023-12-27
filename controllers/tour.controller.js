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
    const queries = {}

    // Pagination
    if (req.query.page) {
        const { page = 1, limit = 3 } = req.query

        const skip = (page - 1) * parseInt(limit)
        queries.skip = skip;
        queries.limit = parseInt(limit)
    }

    // Sort
    if (req.query.sort) {
        // const sortBy = req.query.sort || 'name'
        const sortBy = req.query.sort
        queries.sort = sortBy
    }

    // Projection with Select
    if (req.query.fields) {
        const { fields } = req.query
        queries.fields = fields.split(',').join(' ')
    }

    // Search
    const search = req.query.search || ''

    const tours = await Tour.find({ name: { $regex: search, $options: 'i' } })
        .select(queries.fields)
        .sort(queries.sort)
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

const getSingleTour = async (req, res) => {
    const { id } = req.params
    const tour = await Tour.findById(id)

    if (!tour) {
        return res.status(404).json({
            success: false,
            message: 'No tour found'
        })
    }



    res.status(200).json({
        success: true,
        data: tour
    })
}

const getCheapestTour = async (req, res) => {
    const tour = await Tour.find().sort({ price: 'asc' }).limit(3)


    if (!tour) {
        return res.status(404).json({
            success: false,
            message: 'No tour found'
        })
    }

    res.status(200).json({
        success: true,
        data: tour
    })
}

module.exports = { getAllTours, createTour, getSingleTour, getCheapestTour }