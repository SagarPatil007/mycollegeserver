
// image Upload handler
exports.imageUpload = async (req,res) =>{
    try{
        const {name,tags,email} = req.body;
        // console.log(name,tags,email);

        const file = req.files.imageFile;
        // console.log(file);

        const supportedFiles = ["jpg","jpeg","png"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType,supportedFiles)){
            return res.status(400).json({
                success :false,
                message:"File Format not supported"
            }) 
        }
         
        // file format supported
        const response = await uploadFileToCloudinary(file,"sagar");
        // console.log(response);
        
        // db entry
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl :response.secure_url
        })

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image Uploaded Successfully"
        })


    }catch(err){
        console.log(err);
        res.status(400).json({
            success:false,
            message:"Something went wrong"
        })
    }
}