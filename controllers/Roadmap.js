const Roadmap = require("../models/roadmap");

exports.Roadmap = async(req,res) => {
    try{
        //get data
        const {category, title, description, poster, url} = req.body;

        //create entry for User
        const roadmap = await Roadmap.create({
            category, title, description, poster, url
        })

        return res.status(200).json({
            success:true,
            message:'Roadmap Created Successfully',
        });

    }
    catch(error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'roadmap cannot be created',
        });
    }
}

exports.getRoadmap = async(req,res) => {
    try{
        // find all data
        const data = await Roadmap.find({});

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