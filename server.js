const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

const movieRoutes = require("./routes/movieRoutes");
console.log(process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
.then(() => {

    console.log("MongoDB connected");
    app.use("/movies", movieRoutes);
    app.get("/", (req, res) => {
        res.render("index");
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
.catch(err => {

    console.log("MongoDB CONNECTION ERROR:");
    console.log(err);
});