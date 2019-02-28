import express from "express";
import layouts from "express-ejs-layouts";
import mongoose from "mongoose";
import axios from "axios";
import cheerio from "cheerio";

const db = require("./models");

const app = express();
const PORT = process.env.PORT || 8080;

