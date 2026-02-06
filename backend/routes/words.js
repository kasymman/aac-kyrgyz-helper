const express = require('express');
const router = express.Router();
const Word = require('../models/Word');

// Get all words
router.get('/', async (req, res) => {
  try {
    const words = await Word.find();
    res.json(words);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get words by category
router.get('/category/:category', async (req, res) => {
  try {
    const words = await Word.find({ category: req.params.category });
    res.json(words);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new word
router.post('/', async (req, res) => {
  const word = new Word({
    kyrgyz: req.body.kyrgyz,
    english: req.body.english,
    category: req.body.category,
    imageUrl: req.body.imageUrl,
    audioUrl: req.body.audioUrl
  });

  try {
    const newWord = await word.save();
    res.status(201).json(newWord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a word
router.patch('/:id', async (req, res) => {
  try {
    const word = await Word.findById(req.params.id);
    if (req.body.kyrgyz) word.kyrgyz = req.body.kyrgyz;
    if (req.body.english) word.english = req.body.english;
    if (req.body.category) word.category = req.body.category;
    if (req.body.imageUrl) word.imageUrl = req.body.imageUrl;
    if (req.body.audioUrl) word.audioUrl = req.body.audioUrl;
    const updatedWord = await word.save();
    res.json(updatedWord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a word
router.delete('/:id', async (req, res) => {
  try {
    await Word.findByIdAndDelete(req.params.id);
    res.json({ message: 'Word deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;