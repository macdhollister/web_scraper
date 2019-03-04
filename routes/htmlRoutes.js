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
    db.SavedArticle.findOne({ _id: req.params.id })
        .populate("comments")
        .exec((err, article) => {
            if (err) res.json(err)
            else {
                console.log(article);
                res.json(article)
            }
        })
        // .then(article => {
        //     res.json(article);
        // })
})

module.exports = router;