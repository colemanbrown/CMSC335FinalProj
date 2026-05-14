const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: String,
    review: String,
    rating: Number,
    poster: String
});

module.exports = mongoose.model("Movie", movieSchema);