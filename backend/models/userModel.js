const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type : String,
        required: true,
    },
    email: {
        type : String,
        required: true,
    },
    passwordHash: {
        type : String,
        required: true,
    }
});

exports.User = mongoose.model('User', userSchema);