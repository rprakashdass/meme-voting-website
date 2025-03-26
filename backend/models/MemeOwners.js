const mongoose = require('mongoose');

const MemeOwnerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false,
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    }
});

const MemeOwner = mongoose.model('MemeOwner', MemeOwnerSchema);

module.exports = MemeOwner;