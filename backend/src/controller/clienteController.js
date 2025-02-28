const clienteServices = require("../services/clienteService.js");

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
            res.json({status: false, message: erro});
        }
}
module.exports = {
    createUser,
    viewUser,
}
