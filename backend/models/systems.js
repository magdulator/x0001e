const mongoose = require("mongoose");
'use strict';
const systemSchema = new mongoose.Schema({
    systemName: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    title: {
        type: String,
        required: true,
        min: 3,
        max: 255,
    },
    description: {
        type: String,
        min: 5,
        max: 1024
    },
    img: {
        type: String,
        max: 1024
    },
    date: {
        type: Date,
        default: Date.now
    },
    exampleData: {
        type: String,
        min: 3,
        max: 255
    }
})

var System = mongoose.model('System', systemSchema)
module.exports = System;