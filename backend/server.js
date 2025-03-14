require('dotenv').config();
const express = require("express");
const adminRouter= require("./src/routes/routes.js");
const cors = require('cors');
const path = require("path");
//config.Dotenv();
const app = express();
const fotosDir = path.resolve(__dirname,"./fotosProduto")


app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET","POST","PATCH","DELETE"],   
}));
app.use(express.json());
app.use("/images",express.static(fotosDir));
app.use(adminRouter); 



app.listen(process.env.PORT,'0.0.0.0',()=>{
    console.log("Servidor subiu!!");
})