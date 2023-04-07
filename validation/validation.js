const Joi = require('joi'); 


signupschema = Joi.object().keys({ 
    name:Joi.string().min(3).max(30).required(),
    email: Joi.string().email().min(3).max(30).required(),
    password:Joi.string().min(8).max(15).required(),
    age: Joi.number().required() 
});
loginschema = Joi.object().keys({ 
    email: Joi.string().email().min(3).max(30).required(),
    password:Joi.string().min(8).max(15).required(),
}); 


module.exports.dataToValidate = async(req,res,next) => {
        const value = await signupschema.validate(req.body)
        console.log(value);
        if (value.error) {
            res.status(400).json({
                status: "Failed",
                message: value.error.details[0].message
              });
        }
        else
        {
            next()
        }
    }
module.exports.loginval = async(req,res,next) => {
        const value = await loginschema.validate(req.body)
        console.log(value);
        if (value.error) {
            res.status(400).json({
                status: "Failed",
                message: value.error.details[0].message
              });
        }
        else
        {
            next()
        }
    }
// const result = Joi.validate(dataToValidate, schema); 