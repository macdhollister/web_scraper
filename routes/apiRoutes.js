const db = require("../models");
const axios = require("axios");
const router = require("express").Router();
const cheerio = require("cheerio");
const mongoose = require("mongoose");

// Scrape New Articles
router.get("/scrape", (req, res) => {
    axios.get("https://www.npr.org/sections/news/").then(response => {

        const $ = cheerio.load(response.data);

        // Need title, summary, date, link
        $("article.item").each(function() {
            let foundData = {}
            foundData.title = $(this)
                .find("h2")
                .text()
                .trim();

            foundData.summary = $(this)
                .find("p.teaser")
                .text()
                .split(" • ")[1]
                .trim();

            foundData.date = $(this)
                .find("p.teaser")
                .text()
                .split(" • ")[0]
                .trim();

            foundData.link = $(this)
                .find("h2.title")
                .children("a")
                .attr("href")
                .trim();

            db.Article.findOne({title: foundData.title})
                .then(result => {
                    if (!result) {
                        db.Article.create(foundData)
                            .then(dbArticle => {
                                console.log("Article Created");
                            })
                            .catch(err => console.log(err));
                    }
                })
        });
    }).then(() => {
        res.redirect("/");
    })
})

router.post("/save", (req, res) => {
    db.Article.findById(req.body.id)
        .then(result => {
            console.log(result);
            db.SavedArticle.create({
                title: result.title,
                summary: result.summary,
                date: result.date,
                link: result.link,
                comments: result.comment
            })
            .then(saved => {
                console.log("Article Saved");
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
})

module.exports = router;