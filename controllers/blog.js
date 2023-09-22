const Blog = require("../models/blog");
const { cloudinaryConnect } = require('../config/cloudinary');
const cloudinary = require('cloudinary').v2
const { ApolloServer } = require("@apollo/server")
const { expressMiddleware} = require("@apollo/server/express4")

function isFileTypeSupported(type,supportedFiles){
    return supportedFiles.includes(type);
}

async function uploadFileToCloudinary(file,folder,quality){
    const options = {folder};
    options.resource_type = "auto";

    if(quality){
        options.quality = quality;
    }

    return await cloudinary.uploader.upload(file.tempFilePath,options)
}

exports.addBlog = async (req,res) => {
    try{
        const {title,description,content,userid,user} = req.body; 
        
        const fileimage = req.files.file; 
        
        if(!fileimage){
            return res.status(400).json({
                success : false,
                message : "Image is not found"
            })
        }
        
        const supportedFiles = ["jpg","jpeg","png","webp"];
        
        const extension = fileimage.name.substring(fileimage.name.lastIndexOf('.') + 1, fileimage.name.length);


        if(!isFileTypeSupported(extension   ,supportedFiles)){
            return res.status(400).json({
                filename : extension,
                success :false,
                message:"File Format not supported"
            }) 
        }
       

        const response = await uploadFileToCloudinary(fileimage,"sagar");

        const blog = await Blog.create({
            user,
            title,
            description,
            content,    
            userid,
            imageurl :response.secure_url
        })

        return res.status(200).json({
            success:true,
            url : response.secure_url,
            message:'Blog  Created Successfully',
        });


    }catch(err){
        console.log(err);
        res.status(400).json({
            success:false,
            message:"Something went wrong"
        })
    }
}

exports.getblog = async(req,res)=>{
    
    try{
        const id = req.params.id;

        const blog = await Blog.find({_id:id});

        const array = Object.values(blog);
        
        //sending data to server
        res.send({ array })
        
    }catch(err){
        console.error(err);
        return res.status(500).json({
            success:false,
            message:'error while reading blogs',
        });
    }
}

exports.getallblog = async(req,res)=>{
    try{
        const blog = await Blog.find();

        const array = Object.values(blog);
        
        //sending data to server
        res.send({ array })

    }catch(err){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'error while reading all blogs',
        });
    }
}