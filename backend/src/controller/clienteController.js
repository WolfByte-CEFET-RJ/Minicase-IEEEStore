const clienteServices = require("../services/clienteService.js");


async function viewAllUsers(req,res){
    try{
        const viewService = await clienteServices.viewAllUsers();
        res.json({status: true, message: viewService});
        console.log("controlador executado");
    }catch(erro){
        res.json({status: false, message: erro.message});
    }
}

async function viewUser(req,res){
    try{
        idUser = req.params.id;
        console.log("id recebido:", idUser);
        const viewService = await clienteServices.viewUser(idUser);
        if(!viewService){
            throw new Error("Usúario não encontrado.");
        }

        res.json({message: "usuário encontrado.", data: viewService});
        }catch(erro){
        console.log(erro);
        res.json({status: false, message: erro.message})
    }
}

async function createUser(req, res){
    try{
        const{nome, cpf, idade, telefone, email, cargo, membro_pagante, senha} = req.body;
        const createService = await clienteServices.createUser({
            nome,
            cpf,
            idade,
            telefone,
            email,
            cargo,
            membro_pagante,
            senha,
        });
        console.log("Controlador executado com sucesso");
        res.json({status: true, message: createService});
        }catch(erro){
            console.log(erro)
            res.json({status: false, message: erro});
        }
}

async function updateUser(req, res) {
    try {
        const idUser = req.userId;

        if (parseInt(req.userId) !== parseInt(idUser)) {
            return res.status(403).json({ message: "Acesso negado." });
        }

        const updateData = {};
        const { nome, cpf, idade, telefone, email, cargo, membro_pagante, senha } = req.body;

        if (nome) updateData.nome = nome;
        if (cpf) updateData.cpf = cpf;
        if (idade) updateData.idade = idade;
        if (telefone) updateData.telefone = telefone;
        if (email) updateData.email = email;
        if (cargo) updateData.cargo = cargo;
        if (typeof membro_pagante === "boolean") updateData.membro_pagante = membro_pagante;
        if (senha) updateData.senha = senha;

        const updateService = await clienteServices.updateUser(idUser, updateData);
        if (!!updateService) {
            console.log("Erro ao atualizar usuário");
            return res.json({ message: updateService });
        }
        console.log("Controlador executado.");
    } catch (erro) {
        console.log(erro);
        res.json({ message: erro.message });
    }
}

async function deleteUser(req, res) {
    try {
        const idUser = req.params.id;
        const usuarioLogadoId = req.userId;

        console.log("Tentando excluir usuário:", idUser, "Usuário logado:", usuarioLogadoId);

        const usuario = await knex("cliente").where({ id: idUser }).first();

        if (usuario && usuarioLogadoId) {
            if (parseInt(usuarioLogadoId) !== parseInt(idUser)) {
                return res.json({ message: "Você só pode excluir sua própria conta." });
            }
        }

        const deleteMessage = await clienteServices.deleteUser(idUser);

        console.log("Usuário excluído com sucesso.");
        return res.json({ message: deleteMessage });
    } catch (erro) {
        console.error("Erro ao excluir usuário:", erro);
        return res.json({ message: erro.message });
    }
}


  
module.exports = {
    createUser,
    viewUser,
    viewAllUsers,
    updateUser,
    deleteUser,
}
