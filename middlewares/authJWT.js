const jwt = require('jsonwebtoken');

//checks if the token sent in header is a valid token
const auth = async (req, res, next) => {
    
    const token = req.header('auth-token');
    if(!token) return res.status(403).send({message: "no token provided"});

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        console.log(req.user)
        next();
    }
    catch(err) {
        res.status(401).send("Unauthorized");
    
    }
}

const isAdmin = async (req, res, next) => {
    //hmmm måste hålla reda på vilken user
}

module.exports.auth = auth;
module.exports.isAdmin = isAdmin;