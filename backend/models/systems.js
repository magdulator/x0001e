const mongoose = require("mongoose");
'use strict';
mongoose.set('useFindAndModify', false);
const systemSchema = new mongoose.Schema({
    systemName: {
        type: String,
        required: true,
        min: 3,
        max: 255,
        unique: true
    },
    title: {
        type: String,
        required: true,
        min: 3,
        max: 255,
        unique: true
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