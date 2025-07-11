const jwt = require("jsonwebtoken");
const {User} = require("../models/userModel");

const profileController = async (req,res) =>{
    const token = req.cookies?.authtoken;
    if(token){
        jwt.verify(token,process.env.JWTPRIVATEKEY,{},async(err,userData)=>{
            console.log(userData);
            if(err) throw err;
            const user = await User.findOne({_id: userData._id});
            res.json(user);
            
        });
    } else {
        res.status(401).json("no token");
    }
    const {firstName , lastName, email, avatarLink} = req.body;
    const user = await User.findOne({email});

    if(user){
        user.firstName = firstName;
        user.lastName = lastName;
        user.avatarLink = avatarLink;
        await user.save();
    }
    res.json(user);
};

module.exports = {profileController,profileUpdate};