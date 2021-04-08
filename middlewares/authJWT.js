const jwt = require('jsonwebtoken');
const users = require('../models/users')

//checks if the token sent in header is a valid token
const auth = async (req, res, next) => {
    
    const token = req.header('auth-token');
    if(!token) return res.status(403).send({message: "no token provided"});

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    }
    catch(err) {
        res.status(401).send("Unauthorized");
    
    }
}

const isAdmin = async (req,res,next) => {
    const user = await users.findById(req.user._id);
    if(user.role !== 'admin'){
        res.status(401);
        return res.send("not allowed, admin user needed");
    }
    next()
    
}

module.exports = {
    auth, isAdmin
}