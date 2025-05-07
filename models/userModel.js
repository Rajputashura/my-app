const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema(
    {
        firstName : {type:String, required : true },
        lastName : {type:String, reqired : true},
        email : {type:String, required : true, unique},
        password :{type : String , required : true},
        verified : {type : Boolean, default : false},
        verificationLinkSent : {type : Boolean,default:false},
        avatarLink : {type :String},
    },
    {timestamps : true}
);

userSchema.methods.generateAuthToken = function (){
    const token = jwt.sign(
        {
            _id:this._id,
            firstName : this.firstName,
            lastName : this.lastName,
            email : this.email,
        },  
        process.env.JWTPRIVATEKEY,
        {expiresIn : "7d"}
    );
    return token;
};

const User = mongoose.model("user", userSchema);
const validateRegister = (data) => {
    const schema = joi.object({
        email : joi.string().email().required().label("Email"),
        password :passwordComplexity().reqired().label("Password"),

    });
    return schema.validate(data);
    
};

module.exports = {User ,validateRegister,validateLogin};
