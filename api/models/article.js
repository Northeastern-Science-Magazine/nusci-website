import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const model = mongoose.model;

// article Schema
const ArticleSchema = new Schema({
    title: String,
    author: String,
    year: Number,
    major: String,
    categories: [{type: String}],
    date: Date,
    coverImage: String,
    images: [{type: String}],
    body:[{type: String}],
    pullquotes: [{type: String}],
    sources: [{type: String}],
    comments: [{
        author: String,
        date: Date,
        body: String
    }],
    theme: String,
    elementOrder: [{type: String}]
}, {
    collection: 'pending-articles'
});

// article model
const Article = model("Article", ArticleSchema)

export default Article;