const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
    {
        user:{
            type:String,
            required:true,
        },
        title:{
            type: String,
            required: true,
        },
        imageurl:{
            type: String,
            required: false,
        },
        description:{
            type: String,
            required:true,
            maxLength:20000,
        },
        content:{
            type: String,
            required : true,
        },
        userid:{
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required : true
        },
        createdAt :{
            type: Date,
            required: true,
            default: Date.now(),
        },

    }
)

module.exports = mongoose.model("Blog", blogSchema)