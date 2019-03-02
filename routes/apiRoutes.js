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
        const result = {articles: []};

        // Need title, summary, date, link
        $("article.item").each(function(element) {
            let foundData = {}
            foundData.title = $(this)
                .find("h2")
                .text();

            foundData.summary = $(this)
                .find("p.teaser")
                .text()
                .split(" • ")[1]

            foundData.date = $(this)
                .find("p.teaser")
                .text()
                .split(" • ")[0]

            foundData.link = $(this)
                .find("h2.title")
                .children("a")
                .attr("href");

            result.articles.push(foundData);

            db.Article.create(foundData)
                .then(dbArticle => console.log(dbArticle))
                .catch(err => console.log(err));
        });



        // This will eventually just update the database, then redirect to homepage
        // The '/' route needs to populate home page from database first before this can be implemented
        res.render("home.ejs", result);
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