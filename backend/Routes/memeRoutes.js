const express = require('express');
const multer = require('multer');
const Memes = require('../models/Memes');
const MemeOwner = require('../models/MemeOwners');
const User = require('../models/User');
const router = express.Router();

// Configure Multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST a new meme (with Base64 image)
router.post('/add', upload.single('image'), async (req, res) => {

    console.log("Received body:", req.body);
    console.log("Received file:", req.file);

    const { memeOwner } = req.body;

    try {

        const base64Image = req.file.buffer.toString('base64');

        const newMeme = new Memes({
            memeOwner: memeOwner,
            image: `data:${req.file.mimetype};base64,${base64Image}`,
        });

        await newMeme.save();
        res.status(201).json({ message: "Meme successfully uploaded!", meme: newMeme });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// GET all memes
router.get('/all', async (req, res) => {
    try {
        const memes = await Memes.find({});
        res.status(200).json(memes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// vote
router.post("/vote", async (req, res) => {
    const { memeId, userEmail } = req.body;

    try {
        if (!memeId || !userEmail) {
            return res.status(400).json({ message: "Meme ID and user email are required" });
        }

        // Check if user exists
        const user = await User.findOne({ email: userEmail });
        if (!user) {
            return res.status(403).json({ message: "User not found or not authorized to vote" });
        }

        // Check if the user has already voted for 3 memes
        if (user.votedMemes.length >= 3) {
            return res.status(403).json({ message: "You can vote for a maximum of 3 memes" });
        }

        // Check if the user already voted for this meme
        if (user.votedMemes.includes(memeId)) {
            return res.status(403).json({ message: "You have already voted for this meme" });
        }

        const meme = await Memes.findByIdAndUpdate(
            memeId,
            { $inc: { votes: 1 } },
            { new: true }
        );

        if (!meme) {
            return res.status(404).json({ message: "Meme not found" });
        }

        // Add this meme to the user's votedMemes list
        user.votedMemes.push(memeId);
        await user.save();

        res.status(200).json({ message: "Vote counted!", meme });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE a meme by ID
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedMeme = await Memes.findByIdAndDelete(id);

        if (!deletedMeme) {
            return res.status(404).json({ message: "Meme not found" });
        }

        res.status(200).json({ message: "Meme successfully deleted", meme: deletedMeme });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;