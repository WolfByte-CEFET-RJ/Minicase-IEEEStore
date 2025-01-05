const { configDotenv } = require("dotenv");
const express = require("express");
const homeRouter = require("./routes/homeRouter");
configDotenv();
const app = express();
app.use(homeRouter) 

app.listen(process.env.PORT,'0.0.0.0',()=>{
    console.log("Servidor subiu!!");
})