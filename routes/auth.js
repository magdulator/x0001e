var express = require('express');
const router = express.Router();
const User = require('../models/users');
const {registerValidation, loginValidation} = require('../middlewares/verifySignUp');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//user registration
router.post('/register', async(req, res) => {
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //check if email already exists in db
    const emailExists = await User.findOne({ email : req.body.email});
    if(emailExists) return res.status(400).send("Email already exists");

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role
    });

    try {
        const savedUser = await user.save();
        res.send(savedUser);
        
    }catch(err) {
        res.status(400).send(err);
    }
});

//user login
router.post('/login', async(req, res) => {
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //check if email already exists in db
    const user = await User.findOne({ email : req.body.email});
    if(!user) return res.status(400).send("Email or password is wrong");

    //compare users password with password from request
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send("Email or password is wrong");

    //create jwt token
    const token = jwt.sign({_id : user._id}, process.env.JWT_SECRET);
    res.header('auth-token', token).send(token);

});

module.exports = router;