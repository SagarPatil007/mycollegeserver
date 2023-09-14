const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema(
    {
        imageurl:{
            type: String,
            required: true,
        },
        title:{
            type: String,
            required : true,
        },
        description:{
            type: String,   
            required : true,
        },
        url:{
            type: String,
            required: true,
        },
        craetedAt:{
            type: Date,
            required: true,
            default: Date.now(),
        }  
    }
)

module.exports = mongoose.model("Notes", notesSchema)