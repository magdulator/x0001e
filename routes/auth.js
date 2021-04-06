var express = require('express');

const router = express.Router();

const User = require('../models/users');

//user registration
router.post('/register', async(req, res) => {
    console.log("hej")
    console.log(req.body.username)
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    });
    console.log(user)
    try {
        const savedUser = await user.save();
        res.send(savedUser);
        
    }catch(err) {
        res.status(400).send(err);
    }
})


module.exports = router;