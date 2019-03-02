const path = require("path");
const router = require("express").Router();

const db = require("../models");

router.get("/", (req, res) => {
    res.render("home.ejs", {
        articles: [
            {
                title: "Test title",
                summary: "This is a test article",
                date: "March 1, 2019",
                link: "#"
            }
        ]
    })
})

router.get("/saved", (req, res) => {
    res.render("saved.ejs");
})

module.exports = router;