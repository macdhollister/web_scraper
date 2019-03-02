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
    db.SavedArticle.find({})
        .then(results => {
            res.render("saved.ejs", {
                articles: results
            })
        })
})

module.exports = router;