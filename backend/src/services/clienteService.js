const knexConfig = require("../../knexfile.js");
const knex = require("knex")(knexConfig.development);
const bcrypt = require("bcrypt");
const { configDotenv } = require("dotenv");
const jwt = require("jsonwebtoken");
configDotenv();

async function gerarHashSenha(senha) {
  const saltRounds = 10;
  const senhaHasheada = await bcrypt.hash(senha, saltRounds);
  return senhaHasheada;
}

async function viewAllUsers(){
    try{
        const clientes = await knex("cliente").select("*");
        if (clientes.length === 0){
            throw new Error("Sem usuários no registro.");
        }
        
        return clientes;

    }catch(erro){
        throw(erro);
    }
}

async function viewUser(idUser){
    try{
        const id = idUser;
        if (!id){
            throw new Error("Não foi possível encontrar esse usuário.");
        };
        const userInfo = await knex("cliente").select("*").where({id}).first();
        if (!userInfo){
            throw new Error("Erro ao exibir informações.");
        };
        return {message: "exibindo informacoes", userInfo}
    }catch(erro){
        console.error("erro ao encontrar o usuário.");
        return{ message: "erro ao exibir informações do cliente.", error: erro.message};
    }
}

async function createUser({nome, cpf, idade, telefone, email, cargo, membro_pagante, senha}){
    try{
        const cpfExistente = await knex("cliente").select("*").where({cpf}).first();
        const emailExistente = await knex("cliente").select("*").where({email}).first();

        if(nome === "" || cpf === "" || idade === "" || telefone === "" || membro_pagante === "" || senha === ""){
            throw new Error("Preencha todos os campos obrigatórios.");
        }
        if(cpfExistente || emailExistente){
            throw new Error("Email ou CPF do usuário não podem estar em uso.");
        }
        if (cpf.length !== 11 || !/^\d+$/.test(cpf)) {
            throw new Error(
              "CPF deve ter 11 dígitos e ser composto por apenas números."
            );
        }
        if(typeof membro_pagante != "boolean"){
            throw new Error("membro pagante deve receber apenas valores booleanos.")
        }
        if (!Number.isInteger(idade)) {
            throw new Error("O campo idade deve ser um valor inteiro.");
        }
        if (cargo && (!Array.isArray(cargo) || cargo.some(item => typeof item !== "string"))) {
            throw new Error("O campo cargo deve ser um array de strings.");
        }
      
        const senhaHasheada = await gerarHashSenha(senha);

        const [id] = await knex("cliente").insert({
            nome,
            cpf,
            idade,
            telefone,
            email,
            cargo: JSON.stringify(cargo),
            membro_pagante,
            senha: senhaHasheada
        });

        return{
            message: "cliente criado com sucesso!",
            id
        } 
    }catch(erro){
       console.error("erro ao criar o usuário:", erro);
       throw ("erro ao criar o usuário, tente novamente", erro.message);
    }

}

async function updateUser(idUser, updateData) {
    try {
        const id = idUser;
        const usuario = await knex("cliente").where({ id }).first();
        if (!usuario) {
            throw new Error("Usuário não encontrado.");
        }

        const fieldsToUpdate = {};

        if (updateData.cargo) {
            if (!Array.isArray(updateData.cargo) || updateData.cargo.some(item => typeof item !== "string")) {
                throw new Error("Cargo deve ser um array de strings.");
            }
            fieldsToUpdate.cargo = JSON.stringify(updateData.cargo);
        }

        if (updateData.nome) fieldsToUpdate.nome = updateData.nome;
        if (updateData.cpf) {
            if (updateData.cpf.length !== 11 || !/^\d+$/.test(updateData.cpf)) {
                throw new Error("CPF inválido.");
            }
            const cpfExistente = await knex("cliente").where({ cpf: updateData.cpf }).first();
            if (cpfExistente && cpfExistente.id !== id) {
                throw new Error("CPF já cadastrado.");
            }
            fieldsToUpdate.cpf = updateData.cpf;
        }
        if (updateData.telefone) fieldsToUpdate.telefone = updateData.telefone;
        if (updateData.email) {
            const emailExistente = await knex("cliente").where({ email: updateData.email }).first();
            if (emailExistente && emailExistente.id !== id) {
                throw new Error("Email já cadastrado.");
            }
            fieldsToUpdate.email = updateData.email;
        }
        if (updateData.idade) {
            if (!Number.isInteger(updateData.idade)) {
                throw new Error("Idade deve ser um número inteiro.");
            }
            fieldsToUpdate.idade = updateData.idade;
        }
        if (typeof updateData.membro_pagante === "boolean") {
            fieldsToUpdate.membro_pagante = updateData.membro_pagante;
        }
        if (updateData.senha) {
            if (typeof updateData.senha !== "string" || updateData.senha.length < 8) {
                throw new Error("A senha deve ter no mínimo 8 caracteres.");
            }
            const senhaHasheada = await gerarHashSenha(updateData.senha);
            fieldsToUpdate.senha = senhaHasheada;
        }

        if (Object.keys(fieldsToUpdate).length === 0) {
            throw new Error("Nenhum campo válido para atualizar.");
        }

        await knex("cliente").where({ id }).update(fieldsToUpdate);

        return "Usuário atualizado com sucesso!";
    } catch (error) {
        throw error;
    }
}

async function deleteUser(idUser){
   try{
        const id = idUser;
        const userExistente = await knex("cliente").select("*").where({id}).first();
        if(!userExistente){
            throw new Error("Usuário não encontrado.");
        }
        
        await knex("controle_login").where({id_cliente: idUser}).del();
        await knex("cliente").where({id}).del();

        return "usuário excluído com sucesso!";

    }catch(erro){
        throw erro;
    }
}
  
module.exports = {
    createUser,
    viewUser,
    viewAllUsers,
    updateUser,
    deleteUser,
}