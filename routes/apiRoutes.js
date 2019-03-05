const db = require("../models");
const axios = require("axios");
const router = require("express").Router();
const cheerio = require("cheerio");

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
                            .catch(err => console.log(err));
                    }
                })
        })
    }).then(() => {
        res.redirect("/");
    })
})

router.post("/save", (req, res) => {
    db.Article.findById(req.body.id)
        .then(result => {
            db.SavedArticle.findOne({title: result.title})
                .then(savedResult => {
                    if (!savedResult) {
                        db.SavedArticle.create({
                            title: result.title,
                            summary: result.summary,
                            date: result.date,
                            link: result.link,
                        })
                        .then(() => {
                            res.json({saved: true});
                        })
                        .catch(err => console.log(err));
                    } else {
                        res.json({saved: false});
                    }
                })
        })
        .catch(err => console.log(err));
})

router.post("/unsave", (req, res) => {
    db.SavedArticle.findByIdAndDelete(req.body.id)
        .then(result => {
            res.json(result);
        })
})

router.post("/comment/:id", (req, res) => {
    const c = new db.Comment({body: req.body.text});
    c.save().then(result => {
        return db.SavedArticle.findOneAndUpdate(
            { _id: req.params.id },
            { $push: { comments: result._id } },
            {new: true}
        ).then(foundArticle => {
            // res.json(foundArticle)
            res.redirect("/comments/" + req.params.id);
        })
    })
})

module.exports = router;