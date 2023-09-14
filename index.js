const express = require("express");
const app = express();
const dbConnect = require("./config/database");
const cors = require("cors");
require("dotenv").config();

const corsOptions = {
    origin: "*",
    credentials:true,     
};

const fileupload = require('express-fileupload')
app.use(fileupload({
    useTempFiles:true,
    safeFileNames: true,
    preserveExtension: true,
    tempFileDir:'/tmp/'
}))

const cloudinary = require('./config/cloudinary')
cloudinary.cloudinaryConnect();

const PORT = process.env.PORT || 4000;
dbConnect();

app.use(express.json());
app.use(cors(corsOptions));

const routes = require("./routes/route");
app.use("/api/v1", routes);

app.get("/", (req, res)=>{
    res.send("<h1>Hello sagar</h1>");
})

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
})