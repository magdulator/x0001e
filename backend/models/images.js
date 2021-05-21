const mongoose = require("mongoose");
'use strict';
const imageSchema = new mongoose.Schema({
    path: {
        type: String,
        required: true,
        min: 3,
        max: 255,
        unique: true
    },
    active: {
        type: Boolean,
        default: true,
        required: true,
    },
    nameSystem: {
        type: String,
        max: 128,
    },
    date: {
        type: Date,
        default: Date.now
    },
    type: {
        type: String,
        enum : ['presentation', 'screensaver', 'systemdata'],
        default: 'presentation'
    }
})

var Image = mongoose.model('Image', imageSchema)
module.exports = Image;