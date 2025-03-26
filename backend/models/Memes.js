const mongoose = require('mongoose');

const memeSchema = new mongoose.Schema({
    memeOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MemeOwner',
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    votes: {
        type: Number,
        default: 0,
        required: true
    }
});

const Meme = mongoose.model('Meme', memeSchema);
module.exports = Meme;