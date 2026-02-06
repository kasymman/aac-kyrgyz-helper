const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
    kyrgyz: { type: String, required: true },
    english: { type: String, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String, required: false },
    audioUrl: { type: String, required: false }
});

const Word = mongoose.model('Word', wordSchema);

module.exports = Word;
