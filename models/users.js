const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    new mongoose.Schema({
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
        roles: {
            type: String,
            default: "user",
            enum: ["user", "power", "admin"]
        }
    })
);

module.exports = User;