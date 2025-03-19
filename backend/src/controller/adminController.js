const adminServices = require("../services/adminServices.js");


async function viewAllPedidos(req,res){
  try{
    const viewAllPedidoService = await adminServices.viewAllPedidos();
    res.status(200).json({status: true, viewAllPedidoService});
  }catch(err){
    console.log(err);
    res.status(500).json({status: false, message: err.message})
  }
}

async function viewAdmin(req, res) {
  try {
    const idAdmin = req.userId;
    if (parseInt(req.userId) !== parseInt(idAdmin)) {
      return res.status(403).json({ status: false, message: "Acesso negado." });
    }
    const viewService = await adminServices.viewAdmin(idAdmin);

    res.status(200).json({ status: true, message: viewService });
    console.log("Controlador executado.");
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: false, message: err.message });
  }
}

async function createAdmin(req, res) {
  try {
    const { nome, cargo, cpf, telefone, senha } = req.body;
    const createService = await adminServices.createAdmin({
      nome,
      cargo,
      cpf,
      telefone,
      senha,
    });
    a;
    res.json({ status: true, message: createService });
  } catch (erro) {
    console.log(erro);
    res.json({ status: false, message: erro.message });
  }
}

async function updateAdmin(req, res) {
  try {
    const idAdmin = req.userId;

    if (parseInt(req.userId) !== parseInt(idAdmin)) {
      return res.status(403).json({ status: false, message: "Acesso negado." });
    }

    const updateData = {};
    const { nome, cargo, cpf, telefone, senha } = req.body;

    if (nome) updateData.nome = nome;
    if (cargo) updateData.cargo = cargo;
    if (cpf) updateData.cpf = cpf;
    if (telefone) updateData.telefone = telefone;
    if (senha) updateData.senha = senha;

    const updateService = await adminServices.updateAdmin(idAdmin, updateData);
    if (!!updateService)
      console.log("Erro ao atualizar user") /
        res.json({ status: true, message: updateService });
    console.log("Controlador executado.");
  } catch (error) {
    console.log(error);
    res.json({ status: false, message: error.message });
  }
}

async function deleteAdmin(req, res) {
  try {
    const idAdmin = req.userId;
    if (parseInt(req.userId) !== parseInt(idAdmin)) {
      return res.status(403).json({ status: false, message: "Acesso negado." });
    }
    const deleteAdmin = await adminServices.deleteAdmin(idAdmin);
    res.json({ status: true, message: deleteAdmin });
    console.log("Controlador executado.");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error.message });
  }
}

async function adminCreationPower(req, res) {
  try {
    const { nome, cargo, cpf, telefone, senha } = req.body;
    const criarAdminService = await adminServices.createAdmin({
      nome,
      cargo,
      cpf,
      telefone,
      senha,
    });
    console.log("Se liga", cpf);
    return res.json({ status: true, message: criarAdminService });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
}

module.exports = {
  createAdmin,
  updateAdmin,
  deleteAdmin,
  viewAdmin,
  adminCreationPower,
  viewAllPedidos,
};
