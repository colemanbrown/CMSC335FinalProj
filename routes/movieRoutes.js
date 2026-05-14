const express = require("express");
const router = express.Router();
const axios = require("axios");

const Movie = require("../models/Movie");

router.get("/", async (req, res) => {

    const movies = await Movie.find();

    res.render("movies", { movies });
});

router.get("/add", async (req, res) => {

    const title = req.query.title;

    if (!title) {
        return res.render("addMovie", {
            movie: null
        });
    }

    try {

        const url =
            `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&t=${title}`;

        const response = await axios.get(url);

        res.render("addMovie", {
            movie: response.data
        });

    } catch (error) {

        console.log(error);

        res.send("Movie API Error");
    }
});

router.post("/add", async (req, res) => {

    const { title, review, rating, poster } = req.body;

    const movie = new Movie({
        title,
        review,
        rating,
        poster
    });

    await movie.save();

    res.redirect("/movies");
});

module.exports = router;
