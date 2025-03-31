const express = require("express");
const User = require("../models/User");
const OTP = require("../models/Otp");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const dotenv = require('dotenv');
dotenv.config();
const router = express.Router();

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

// OTP Generation
const generateOTP = () => crypto.randomInt(100000, 999999).toString();

// Sends OTP to User's Email
router.post("/send-otp", async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    try {
        const otp = generateOTP();
        // otp validity
        const expiry = Date.now() + 5 * 60 * 1000;

        // Save OTP in the database
        await OTP.findOneAndUpdate(
            { email },
            { email, otp, expiresAt: expiry },
            { upsert: true }
        );

        // Email content
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "Your Meme Voting OTP",
            text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
        });

        res.status(200).json({ message: "OTP sent successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Verify OTP and Log in User
router.post("/verify-otp", async (req, res) => {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ message: "Email and OTP are required" });

    try {
        const storedOtp = await OTP.findOne({ email });

        if (!storedOtp || storedOtp.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        if (Date.now() > storedOtp.expiresAt) {
            return res.status(400).json({ message: "OTP expired. Request a new one." });
        }

        // Check if user exists, otherwise create one
        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({ email, votedMemes: [] });
        }

        res.status(200).json({ message: "OTP verified successfully!", user });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post("/check-user", async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email });
    return res.status(200).json({ exists: !!user });
});


module.exports = router;
