const express = require("express");
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");

const path = require("path");


// Database
const db = require("./models");
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/nprScraper";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// test connection
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Connected to MongoDB...");
})

// Initialize App
const app = express();
const PORT = process.env.PORT || 8080;

// Static files
app.use(express.static("public"));

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// EJS (view engine)
app.use(layouts);
app.set("view engine", "ejs");
app.set("views", "./public/views/pages");

// Routes
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");
app.use(apiRoutes);
app.use(htmlRoutes);


app.listen(PORT, () => {
    console.log("App running on port " + PORT);
});