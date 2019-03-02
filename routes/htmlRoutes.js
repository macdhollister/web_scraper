const path = require("path");
const router = require("express").Router();

const db = require("../models");

router.get("/", (req, res) => {
    db.Article.find({})
        .then(results => {
            res.render("home.ejs", {
                articles: results
            })
        })
})

router.get("/saved", (req, res) => {
    res.render("saved.ejs");
})

module.exports = router;