const mongoose = require("mongoose");

const AvatarSchema = new mongoose.schema(
    {
        link : {
            type : String,
            required : true,
            default :"https://i.imgur.com/8z4v2xk.png",

        },
    },
    { timestamps : true}
);

const Avatar = mongoose.model("Avatar", AvatarSchema);

module.exports = Avatar;
