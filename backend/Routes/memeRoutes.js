const express = require('express');
const Memes = require('../models/Memes');
const MemeOwner = require('../models/MemeOwners');
const router = express.Router();

// GET all memes
router.get('/all', async (req, res) => {
    try {
        const memes = await Memes.find({});
        if (memes.length === 0) {
            return res.status(404).json({ message: "No memes found!" });
        }
        res.status(200).json(memes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// POST a new meme
router.post('/add', async (req, res) => {
    const { memeOwner, image, description } = req.body;

    try {
        const ownerExists = await MemeOwner.findById(memeOwner);
        if (!ownerExists) {
            return res.status(404).json({ message: "Meme owner not found!" });
        }

        const newMeme = new Memes({ memeOwner, image, description, votes: 0 });
        await newMeme.save();
        res.status(201).json(newMeme);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;