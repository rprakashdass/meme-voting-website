const express = require('express');
const MemeOwner = require('../models/MemeOwners');

const router = express.Router();

// ✅ Register a new meme owner
router.post('/register', async (req, res) => {
    try {
        const { name, phoneNumber, email } = req.body;
        const newOwner = new MemeOwner({ name, phoneNumber, email });
        await newOwner.save();
        res.status(201).json(newOwner);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// ✅ Get all meme owners
router.get('/all', async (req, res) => {
    try {
        const owners = await MemeOwner.find({});
        res.status(200).json(owners);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ✅ Get a specific owner by ID
router.get('/:id', async (req, res) => {
    try {
        const owner = await MemeOwner.findById(req.params.id);
        if (!owner) return res.status(404).json({ message: "Meme owner not found!" });
        res.json(owner);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
