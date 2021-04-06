const mongoose = require("mongoose");
const roles = require("mongoose-role");
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
        enum : ['user', 'power', 'admin'],
        default: 'user'
    }
})


//handle roles


var User = mongoose.model('User', userSchema)
var neaw = new User({name: "hej", email: "hej@se", password: "hej", role: "user"});
module.exports = User;