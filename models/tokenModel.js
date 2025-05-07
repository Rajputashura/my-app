const { required } = require("joi");
const mongoose  = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
     userId:
       {type : Schema.Types.objectId,
        required : true,
        ref : "user",
        unique : true,
       },
       token : {type : string, required : true},
       createdAt : {type : Date, default : Date.now},
       expiresAt : {type : Date, default : Date.now + 3600000},
});

const Token = mongoose.model("token",tokenSchema);
module.exports = Token;