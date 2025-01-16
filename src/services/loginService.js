const knexConfig = require("../../knexfile.js");
const knex = require("knex")(knexConfig.development);
const bcrypt = require("bcrypt");
const { configDotenv } = require("dotenv");
const jwt = require("jsonwebtoken");
configDotenv();

function gerarTokenAdmin(admin){
    const token = jwt.sign({ id:admin.id, role: "admin"}, process.env.JWT_KEY,{expiresIn: "1h"});
    return token;
}
function gerarTokenUser(user){
    const token = jwt.sign({ id:user.id}, process.env.JWT_KEY,{expiresIn: "1h"});
    return token;
}
async function login({cpf,email,senha}){
    try{
         if(cpf){
            const admin = await knex("administrador").where({cpf}).first();
            
            if(!admin){
                throw new Error("Administrador não encontrado.");
            }
            const senhaCorreta= await bcrypt.compare(senha, admin.senha);
            if(!senhaCorreta){
                throw new Error("Senha incorreta.");
            }
            const token = gerarTokenAdmin(admin);
            return { message: 'Login bem-sucedido!', token };
         }
         else if(email){
            const user = await knex("cliente").where({email}).first();
            if(!user){
                throw new Error("Cliente não encontrado.");
            }
            const senhaCorreta = await bcrypt.compare(senha, user.senha);
            if(!senhaCorreta){
                throw new Error("Senha incorreta.");
            }
            const token = gerarTokenUser(user);
            return { message: 'Login bem-sucedido!', token };
         }
    }catch(error){
        throw error;
    }
}

module.exports = {
    login,
};
