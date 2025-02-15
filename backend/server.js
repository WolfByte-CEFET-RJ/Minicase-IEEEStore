require('dotenv').config();
const express = require("express");
const adminRouter= require("./src/routes/routes.js");
const cors = require('cors');
//config.Dotenv();
const app = express();
app.use(express.json());
app.use(adminRouter); 
app.use(cors())



app.listen(process.env.PORT,'0.0.0.0',()=>{
    console.log("Servidor subiu!!");
})