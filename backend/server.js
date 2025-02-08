require('dotenv').config();
const express = require("express");
const adminRouter= require("./src/routes/routes.js");
//config.Dotenv();
const app = express();
app.use(express.json());
app.use(adminRouter); 



app.listen(process.env.PORT,'0.0.0.0',()=>{
    console.log("Servidor subiu!!");
})