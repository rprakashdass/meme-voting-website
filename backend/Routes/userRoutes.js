const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Register a new user
router.post('/register', async (req, res) => {
    const { name, email, phoneNumber, password, votedMemes } = req.body; // ✅ Removed `()` from req.body

    try {
        const user = new User({
            name,
            email,
            phoneNumber,
            password,
            votedMemes
        });

        await user.save(); // ✅ Save user to DB
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message }); // ✅ 400 for bad request
    }
});

// Get all users
router.get('/all', async (req, res) => { // ✅ Use `async`
    try {
        const users = await User.find({}); // ✅ Await `find()`
        if (!users || users.length === 0) { // ✅ Check for empty list
            return res.status(404).json({ message: "No users found!" });
        }

        res.status(200).json(users); // ✅ 200 is correct for success
    } catch (error) {
        res.status(500).json({ message: error.message }); // ✅ 500 for server error
    }
});

module.exports = router;
