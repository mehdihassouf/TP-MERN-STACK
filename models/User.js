const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
    },
    gender: {
        type: String,
    },
    dob: {
        type: Date,
    },
    news: {
        type: Boolean,
    },
    email: {
        type: String,
    },
    avatar: {
        type: String,
    },
    status: {
        type: String,
    },
    skills: {
        type: [String],
    },
    bio: {
        type: String,
    }
});

module.exports = mongoose.model('user', UserSchema);
