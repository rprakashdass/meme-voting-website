const mongoose = require('mongoose');

const MemeOwnerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    phoneNumber: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    }
});

const MemeOwner = mongoose.model('MemeOwner', MemeOwnerSchema);

module.exports = MemeOwner;