const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    phoneNumber: {
        type: Number,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    votedMemes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Memes'
    }]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;