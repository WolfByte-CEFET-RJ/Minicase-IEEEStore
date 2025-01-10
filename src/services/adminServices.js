const knex = require("../../knexfile.js");
const bcrypt = require("bcrypt");

async function createAdmin(nome, cargo, cpf, telefone, senha) {
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

async function gerarHashSenha(senha) {
    const saltRounds = 10;
    const senhaHasheada = await bcrypt.hash(senha, saltRounds);
    return senhaHasheada;
}

module.exports = {
    createAdmin
};
