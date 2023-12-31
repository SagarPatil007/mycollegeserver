const express = require("express");
const router = express.Router();    

// middleware

const {auth} = require("../middleware/auth"); 

// controller
const {Signin,Signup} = require("../controllers/Auth");
const {Roadmap,getRoadmap} = require("../controllers/Roadmap");
const {Addnote,getAllnotes} = require("../controllers/Notes");
const {contactUS} = require("../controllers/Contactus");
const {addBlog,getallblog,getblog} = require("../controllers/blog");
const {userInfo} = require("../controllers/userinfo");


// protected routes
// router.get("/userinfo/:id", auth, userInfo)
// router.post("/addnote", auth, Addnote)
// router.post("/addblog",auth,addBlog)



// public routes
router.post("/login", Signin);
router.post("/signup", Signup);
router.post("/roadmap", Roadmap);
router.get("/getroadmap", getRoadmap)
router.get("/getallnotes", getAllnotes)
router.post("/contact",contactUS)
router.get("/viewblog",getallblog);
router.get("/viewblog/:id",getblog);
router.get("/userinfo/:id",auth,userInfo)
router.post("/addnote",auth, Addnote)
router.post("/addblog",auth,addBlog)


module.exports = router; 