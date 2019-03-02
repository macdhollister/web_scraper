const db = require("../models");
const axios = require("axios");
const router = require("express").Router();
const cheerio = require("cheerio");

// Scrape New Articles
router.get("/scrape", (req, res) => {
    console.log("scrape started");
    axios.get("https://www.npr.org/sections/news/").then(response => {

        console.log("Axios data received");

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

            // db.Article.create(foundData)
            //     .then(dbArticle => console.log(dbArticle))
            //     .catch(err => console.log(err));

            db.Article.findOne({title: foundData.title})
                .then(result => {
                    if (!result) {
                        db.Article.create(foundData)
                        .then(dbArticle => {
                            console.log(dbArticle);
                            res.redirect("/");
                        })
                        .catch(err => console.log(err));
                    }
                })
        });
    })
})

 
//         // Create a new Article using the `result` object built from scraping
//         db.Article.create(result)
//           .then(function(dbArticle) {
//             // View the added result in the console
//             console.log(dbArticle);
//           })
//           .catch(function(err) {
//             // If an error occurred, log it
//             console.log(err);
//           });
//       });
  
//       // Send a message to the client
//       res.send("Scrape Complete");
//     });
//   });  

module.exports = router;