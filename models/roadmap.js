const mongoose = require("mongoose");

const roadmapSchema = new mongoose.Schema(
    {
        category:{
            type: String,
            required : true,
        },
        title:{
            type: String,
            required: true,
        },
        description:{
            type: String,
            required: true,
        },
        date:{
            type: Date,
            required: true,
            default: Date.now(),
        },
        poster:{
            type: String,
            required : true,
        },
        url:{
            type: String,
            required: true,
        }

    }
)

module.exports = mongoose.model("Roadmap", roadmapSchema)