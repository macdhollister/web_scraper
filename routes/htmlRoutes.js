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

router.get("/comments/:id", (req, res) => {
    db.SavedArticle.findById(req.params.id)
        .populate("Comments")
        .then(article => {
            res.json(article);
        })
})

module.exports = router;