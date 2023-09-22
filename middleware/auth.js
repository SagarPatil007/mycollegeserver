const jwt = require("jsonwebtoken");
require("dotenv").config();


exports.auth = (req,res, next) => {

    try{
        //extract JWT token
        //PENDING : other ways to fetch token

        const token = req.headers.authorization?.split(' ')[1];

        if(!token || token === undefined) {
            return res.status(401).json({
                success:false,
                message:'Token Missing',
            });
        }

        //verify the token
        try{
            
            try{
                const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
                req.user = payload;
            }
            catch(err){
                return res.status(401).json({
                    success:false,
                    err : err.message,
                    message: "Broke while verfiying jwt",
                    token : token
                });
            }           

        } catch(error) {
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }
        next();
    } 
    catch(error) {
        return res.status(401).json({
            success:false,
            message:'Something went wrong, while verifying the token',
            error:error.message,
        });
    }
   
}
