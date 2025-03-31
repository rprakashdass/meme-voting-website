const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    votedMemes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Memes'
    }]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;