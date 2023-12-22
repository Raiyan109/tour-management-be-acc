const mongoose = require('mongoose');

const Schema = mongoose.Schema

const tourSchema = new Schema({
    name: String,
    price: Number,
    featured: Boolean,
    rating: Number,
    location: String,
})

module.exports = mongoose.model('Tour', tourSchema)