const Notes = require('../models/notes')

exports.Addnote = async (req, res) => {
    try {
        const { title, description, url , imageurl} = req.body;

        if(!title || !description || !url || !imageurl) {
            return res.status(400).json({
                success : false,
                message : "title or description or url can't be empty"
            })
        }

        const notes = await Notes.create({
            title,
            description,
            url,
            imageurl
        })

        res.json({
            success:true,
            note : notes,
            message:"Note added Successfully"
        })

    }
    catch (err) {
        console.log(err);
        res.status(400).json({
            success:false,
            message:"Something went wrong"
        })
    }
}

exports.getAllnotes = async (req, res) => {
    try{
        // find all data
        const data = await Notes.find({});

        const array = Object.values(data);
        
        //sending data to server
        res.send({ array })
    }
    catch(error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'error while reading roadmap',
        });
    }
}