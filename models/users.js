const mongoose = require("mongoose");
'use strict';
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 5,
        max: 255
    },
    password: {
        type: String,
        required: true,
        max: 1024
    },
    date: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        enum : ['user', 'power-user', 'admin'],
        default: 'user'
    }
})

var User = mongoose.model('User', userSchema)
module.exports = User;