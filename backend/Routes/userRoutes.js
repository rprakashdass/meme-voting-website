const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Register a new user
router.post('/create', async (req, res) => {
    const { name, email, phoneNumber, password, votedMemes } = req.body;
    try {
        const user = new User({
            name,
            email,
            phoneNumber,
            password,
            votedMemes
        });

        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all users
router.get('/all', async (req, res) => {
    try {
        const users = await User.find({});
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No users found!" });
        }

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// check if user exists
router.post('/exists', async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: "Email is required" });

        const user = await User.findOne({ email });
        res.status(200).json({ exists: !!user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// voted memes
router.post('/user-votes', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found", votedMemes: [] });
        }

        res.status(200).json({ votedMemes: user.votedMemes });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/is-admin", async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.json({ isAdmin: user.role === "admin" });
    } catch (error) {
        console.error("Error checking admin role:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
