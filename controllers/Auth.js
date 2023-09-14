const User = require("../Models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.Signin = async(req,res) => {
    try {
        //data fetch
        const {email, password} = req.body;
        //validation on email and password

        if(!email || !password) {
            return res.status(400).json({
                success:false,
                message:'Please fill all the details carefully',
            });
        }

        //check for registered user
        let user = await User.findOne({email});

        //if not a registered user
        if(!user) {
            return res.status(401).json({
                success:false,
                message:'User is not registered',
            });
        }

        const userId = user._id;

        const payload = {
            email:user.email,
            id:user._id,
        };

        //verify password & generate a JWT token
        if(await bcrypt.compare(password,user.password) ) {
            //password match
            let token =  jwt.sign(payload, 
            process.env.JWT_SECRET_KEY,
            {
                expiresIn:"2h",
            }); 
                                
            user = user.toObject();
            user.token = token;
            user.password = undefined;

            await User.updateOne({_id:user._id},{
                $set : {
                    'token': token,
                }},
                { multi: true },
            )

            res.send({ 
                id:user._id,
                name : user.name,
                token:token
            })
            
        }
        else {
            //passwsord do not match
            return res.status(403).json({
                success:false,
                message:"Password Incorrect",
            });
        }
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            error : error.message,
            message:'Login Failure',
        });
    }
}

exports.Signup = async(req,res) => {
    try{
        //get data
        const {name, email, password} = req.body;
        //check if user already exist
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                success:false,
                message:'User already Exists',
            });
        }

        //secure password
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch(err) {
            return res.status(500).json({
                success:false,
                message:'Error in hashing Password',
            });
        }

        //create entry for User
        const user = await User.create({
            name,email,password:hashedPassword
        })

        return res.status(200).json({
            success:true,
            message:'User Created Successfully',
        });

    }
    catch(error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'User cannot be registered, please try again later',
        });
    }
}