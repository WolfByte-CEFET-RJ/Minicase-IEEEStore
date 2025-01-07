const { configDotenv } = require("dotenv");
const express = require("express");
const homeRouter = require("./routes/homeRouter");
configDotenv();
const app = express();
app.use(homeRouter) 

console.log('Host:', process.env.KNEX_HOST);
console.log('Port:', process.env.KNEX_PORT);
console.log('User:', process.env.KNEX_USERNAME);
console.log('Password:', process.env.KNEX_PASSWORD);
console.log('Database:', process.env.KNEX_DATABASE);

app.listen(process.env.PORT,'0.0.0.0',()=>{
    console.log("Servidor subiu!!");
})