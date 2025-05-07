const mongoose = require("mongoose");

module.exports = async () => {
    try{
        await mongoose.connect(process.env.DB);
        console.log("DB Connected Successfully")
    } catch(error){
        console.log(error)
        console.log("could not connect to DB");
        
        
    }
}