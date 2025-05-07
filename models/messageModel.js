const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
    {
        sender : {type : mongoose.Schema.Types.objectId, ref:"User"},
        recipient : {type : mongoose.Schema.Types.objectId,ref:"User"},
    },
    {
        timestamps : true,
    }
);

const Message = mongoose.model("Message",MessageSchema);
module.exports = Message;