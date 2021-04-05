var express = require('express');

const router = express.Router();

const User = require('../models/users');

router.post('/register', (req, res) => {
    const user = new User({
        name: req.body.name,
        //adda alla grejor
    })
})