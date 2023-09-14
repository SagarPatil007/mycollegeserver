const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            maxLength : 100,
        },
        email:{
            type: String,  
            required : true,
            unique : true,
        },
        password:{
            type: String,
            required : true,
        },
        createdAt:{
            type: Date,
            default: Date.now(),
            required : true,
        },
        token :{
            type: String,
        }
    }
)

module.exports = mongoose.model("User",userSchema);