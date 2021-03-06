const Joi = require('@hapi/joi');

//validates before request
const registerValidation = (data) => {
    const schema = Joi.object({
        username : Joi.string() .min(3) .required(),
        email : Joi.string() .min(6) .required() .email(),
        password : Joi.string() .min(5) .required(),
        role : Joi.string()
    });
    return schema.validate(data);
};


const loginValidation = (data) => {
    const schema = Joi.object ({
        email : Joi.string().min(6).required().email(),
        password : Joi.string().min(5).required()
    });
    return schema.validate(data);
}

module.exports = {
    registerValidation, loginValidation
}