const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    date: {
        type: String
    },
    link: {
        type: String,
        required: true
    },
    createdAt: { 
        type: Date, 
        default: Date.now,
        expires: 604800 // expires after 1 week
    },
    comment: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }]
});

const Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;