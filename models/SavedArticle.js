const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SavedArticleSchema = new Schema({
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
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }]
});

const SavedArticle = mongoose.model("SavedArticle", SavedArticleSchema);

// Export the Article model
module.exports = SavedArticle;
