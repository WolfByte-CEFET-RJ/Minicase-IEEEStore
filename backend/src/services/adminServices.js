const knexConfig = require("../../knexfile.js");
const knex = require("knex")(knexConfig.development);
const bcrypt = require("bcrypt");
const { configDotenv } = require("dotenv");
const jwt = require("jsonwebtoken");
configDotenv();

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

async function gerarHashSenha(senha) {
    const saltRounds = 10;
    const senhaHasheada = await bcrypt.hash(senha, saltRounds);
    return senhaHasheada;
}
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

async function createAdmin({nome, cargo, cpf, telefone, senha}) {
    try {
        const cpfExistente = await knex("administrador").select("*").where({ cpf }).first();
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


async function updateAdmin(id, updateData) {
    try {
        const idExiste = await knex("administrador")
            .where({ id })
            .first();

        if (!idExiste) {
            throw new Error("Administrador não encontrado.");
        }

        
        const fieldsToUpdate = {};

        
        if (updateData.cargo) {
            if (!Array.isArray(updateData.cargo)) {
                throw new Error("Cargo deve ser um array.");
            }
            for (let item of updateData.cargo) {
                if (typeof item !== 'string') {
                    throw new Error("Cada item do cargo deve ser uma string.");
                }
            }
            fieldsToUpdate.cargo = JSON.stringify(updateData.cargo);  // Adiciona o campo 'cargo' ao objeto de atualização
        }

        
        if (updateData.nome) {
            fieldsToUpdate.nome = updateData.nome;
        }

        
        if (updateData.cpf) {
            fieldsToUpdate.cpf = updateData.cpf;
        }

        
        if (updateData.telefone) {
            fieldsToUpdate.telefone = updateData.telefone;
        }

        
        if (updateData.senha) {
            if (updateData.senha.length < 6) {
                throw new Error("A senha deve ter no mínimo 6 caracteres.");
            }
            const senhaHasheada = await gerarHashSenha(updateData.senha);
            fieldsToUpdate.senha = senhaHasheada;
        }

        
        if (Object.keys(fieldsToUpdate).length === 0) {
            throw new Error("Nenhum campo válido para atualizar.");
        }

        
        await knex("administrador")
            .where({ id })
            .update(fieldsToUpdate);

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
    createAdmin,updateAdmin,deleteAdmin,viewAdmin,checkAdmin,
};
