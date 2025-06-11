const knexConfig = require("../../knexfile.js");
const knex = require("knex")(knexConfig.development);
const bcrypt = require("bcrypt");
const { configDotenv } = require("dotenv");
const jwt = require("jsonwebtoken");
configDotenv();

function gerarTokenAdmin(admin){
    const token = jwt.sign({ id:admin.id, role: "admin"}, process.env.JWT_KEY,{expiresIn: "24h"});
    return token;
}
function gerarTokenUser(user){
    const token = jwt.sign({ id:user.id}, process.env.JWT_KEY,{expiresIn: "24h"});
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
            const login = await knex("controle_login").insert({id_admin: admin.id})
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
            const login = await knex("controle_login").insert({id_cliente: user.id})
            return { message: 'Login bem-sucedido!', token };
         }
    }catch(error){
        throw error;
    }
}

async function viewLogin(dataInicio=0, dataFim=0){
    try{
        let view;
        if(dataFim===0 && dataInicio===0){
            view = await knex("controle_login").select("*");
        }
        else{
            view = await knex("controle_login").where("hora_login",'>=',dataInicio).where("hora_login",'<=',dataFim);
        }
        console.log(view)
        if(!view){
            throw new Error("Erro ao exibir logs");
        }
        if(view.length ===0){
            throw new Error("Não foi possível encontrar alteracoes");
        }
        return view
    }catch(error){
        console.log("Erro ao visualizar os logs");
        throw error;
    }

}
module.exports = {
    login,viewLogin,
};
