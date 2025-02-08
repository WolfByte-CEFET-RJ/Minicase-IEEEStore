const adminServices = require("../services/adminServices.js");


async function viewAdmin(req,res){
    try{
        const {id} = req.params;
        if (parseInt(req.userId) !== parseInt(id)) {
            return res.status(403).json({ status: false, message: "Acesso negado." });
        }
        const viewService = await adminServices.viewAdmin(id);

        res.status(200).json({status: true, message: viewService})
        console.log("Controlador executado.")
    }catch(err){
        console.log(err);
        res.status(500).json({status:false,message:err.message})
    }
}

async function createAdmin(req, res){
    try{
    const {nome, cargo, cpf, telefone, senha} = req.body;
    const createService = await adminServices.createAdmin({nome, cargo, cpf, telefone, senha});
    res.json({status: true, message: createService});;

    }catch(erro){
        console.log(erro);
        res.json({status: false, message: erro.message});
    }
}

async function updateAdmin(req, res) {
    try {
        const { id } = req.params;

        if (parseInt(req.userId) !== parseInt(id)) {
            return res.status(403).json({ status: false, message: "Acesso negado." });
        }

        const updateData = {};
        const { nome, cargo, cpf, telefone, senha } = req.body;

        if(nome) updateData.nome = nome;
        if(cargo) updateData.cargo = cargo;
        if(cpf) updateData.cpf = cpf;
        if(telefone) updateData.telefone = telefone;
        if(senha) updateData.senha = senha;

        const updateService = await adminServices.updateAdmin(id, updateData);
        if(!!updateService) console.log("Erro ao atualizar user")/
        res.json({ status: true, message: updateService });
        console.log("Controlador executado.");
    } catch (error) {
        console.log(error);
        res.json({ status: false, message: error.message });
    }
}

async function deleteAdmin(req, res) {
    try {
        const { id } = req.params;
        if (parseInt(req.userId) !== parseInt(id)) {
            return res.status(403).json({ status: false, message: "Acesso negado." });
        }
        const deleteAdmin = await adminServices.deleteAdmin(id);
        res.json({ status: true, message: deleteAdmin });
        console.log("Controlador executado.");
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: error.message });
    }
}

async function adminCreationPower(req,res){
    try{
        const {novoAdmin} = req.body;
        const { nome, cargo, cpfNovo, telefone, senhaNovo } = novoAdmin || {};
        const criarAdminService = await adminServices.createAdmin({
            nome,
            cargo,
            cpf: cpfNovo,
            telefone,
            senha: senhaNovo
        });  
        return res.json({status:true,message: criarAdminService})
    }catch(err){
        res.status(500).json({status: false, message:err.message});
    }
}

module.exports = {
    createAdmin,updateAdmin,deleteAdmin,viewAdmin,adminCreationPower
}