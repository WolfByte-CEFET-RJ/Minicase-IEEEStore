const knexConfig = require("../../knexfile.js");
const knex = require("knex")(knexConfig.development);
const bcrypt = require("bcrypt");
const { configDotenv } = require("dotenv");
const jwt = require("jsonwebtoken");
configDotenv();


async function viewAdmin(id){
    try{
        if(!id){
            throw new Error("Administrador não encontrado.");
        }
        const adminInfo = await knex("administrador").select("*").where({id}).first();
        if(!adminInfo){
            throw new Error("Erro ao exibir informações");
        }
        return {message: "Exibindo... ", adminInfo};
    }catch(error){
        throw error;
    }
}
async function checkAdmin(cpf, senha) {
    try {
        if (!cpf) {
            throw new Error("O CPF não foi fornecido.");
        }
        console.log("Consultando CPF:", cpf);

        const admin = await knex("administrador").select("*").where({ cpf }).first();
        console.log(admin);
        if (!admin) {
            throw new Error("Nenhum administrador com esse CPF localizado.");
        }

        const senhaCorreta = await bcrypt.compare(senha, admin.senha);
        
        if (!senhaCorreta) {
            throw new Error("Senha incorreta.");
        }

        return admin;  
    } catch (err) {
        throw err;
    }
}

async function createAdmin({nome, cargo, cpf, telefone, senha}) {
    console.log("ENtrei no createadmin")
    console.log("Olha aq garotao", telefone)
    try {
        const cpfExistente = await knex("administrador").select("*").where({ cpf }).first();
        console.log("Passei da query")
        if (cpfExistente) {
            throw new Error("Já existe um administrador registrado com esse CPF.");
        }

        if (nome === "" || cargo === "" || cpf === "" || telefone === "" || senha === "") {
            throw new Error("Todos os campos devem ser preenchidos.");
        }

        if (cpf.length !== 11 || !/^\d+$/.test(cpf)) {
            throw new Error("CPF deve ter 11 dígitos e ser composto por apenas números.");
        }

        if (!Array.isArray(cargo) || cargo.length === 0) {
            throw new Error("O campo cargo deve ser um array não vazio.");
        }

        for (let item of cargo) {
            if (typeof item !== 'string') {
                throw new Error("Cada item do cargo deve ser uma string.");
            }
        }

        const senhaHasheada = await gerarHashSenha(senha);

        const [admin] = await knex("administrador").insert({
            nome,
            cargo: JSON.stringify(cargo),
            cpf,
            telefone,
            senha: senhaHasheada,
        }).returning('*');

        return "Administrador cadastrado com sucesso!";
    } catch (erro) {
        throw erro;
    }
}
function gerarToken(admin){
    const token = jwt.sign({ id:admin.id}, process.env.JWT_KEY,{expiresIn: "1h"});
    return token;
}

async function loginAdmin(cpf,senha){
    try{
        const admin = await knex("administrador").where({cpf}).first();
         
        if(!admin){
            throw new Error("Administrador não encontrado.");
        }
        const senhaCorreta= await bcrypt.compare(senha, admin.senha);
        if(!senhaCorreta){
            throw new Error("Senha incorreta.");
        }
        const token = gerarToken(admin);
        return { message: 'Login bem-sucedido!', token };
    }catch(error){
        throw error;
    }
}

async function gerarHashSenha(senha) {
    const saltRounds = 10;
    const senhaHasheada = await bcrypt.hash(senha, saltRounds);
    return senhaHasheada;
}

async function updateAdmin(id, nome, cargo, cpf, telefone, senha) {
    try {
        const idExiste = await knex("administrador")
            .where({ id })
            .first();

        if (!idExiste) {
            throw new Error("Administrador não encontrado.");
        }

        if (!nome || !cargo || !cpf || !telefone || !senha) {
            throw new Error("Todos os campos devem ser preenchidos.");
        }

        if (!Array.isArray(cargo)) {
            throw new Error("Cargo deve ser um array.");
        }

        for (let item of cargo) {
            if (typeof item !== 'string') {
                throw new Error("Cada item do cargo deve ser uma string.");
            }
        }

        const senhaHasheada = await gerarHashSenha(senha);

        await knex("administrador")
            .where({ id })
            .update({
                nome,
                cargo: JSON.stringify(cargo),
                cpf,
                telefone,
                senha: senhaHasheada,
            });

        return "Admin atualizado com sucesso!";
    } catch (error) {
        throw error;
    }
}

async function deleteAdmin(id) {
    try {
  
      const adminExistente = await knex("administrador").select("*").where({ id });
      
      if (!adminExistente) {
        throw new Error("Administrador não encontrado.");
      }
  

      await knex("administrador").where({ id }).del();
      
      return "Administrador deletado com sucesso!";
    } catch (erro) {
      throw erro;
    }
  }
  

module.exports = {
    createAdmin,updateAdmin,deleteAdmin,loginAdmin,viewAdmin,checkAdmin,
};
