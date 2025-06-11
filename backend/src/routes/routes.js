const express = require("express");
const router = express.Router();
const {adminAutentication} = require("../middleware/adminAuth.js");
const adminController = require("../controller/adminController.js");
const loginController = require("../controller/loginController.js");
const produtoController = require("../controller/produtoController.js");
const avaliacaoController = require("../controller/avaliacaoController.js");
const metodo_pagamentoController = require('../controller/metodo_pagamentoController.js');

const clienteController = require("../controller/clienteController.js");
const pedidoController = require("../controller/pedidoController.js");
const {uploadProduto, uploadComprovante} = require("../middleware/upload.js");
const {autenticar} = require("../middleware/auth.js");

//ADMINISTRADOR
//Substituir autenticar por adminAutentication
router.get("/admin",adminAutentication,adminController.viewAdmin);
router.post("/admin/criar",adminAutentication,adminController.adminCreationPower);
router.post("/login",loginController.login);
router.patch("/admin",adminAutentication,adminController.updateAdmin);
router.delete("/admin",adminAutentication,adminController.deleteAdmin);

//PRODUTO
router.get("/produto/imagem/:id",autenticar || adminAutentication, produtoController.serveImage)
router.get("/produto/:id",autenticar || adminAutentication, produtoController.viewProdutoId);
router.get("/produto", autenticar || adminAutentication, produtoController.viewAllProduto);
router.post("/produto", adminAutentication, uploadProduto.single("foto"), produtoController.createProduto);
router.patch("/produto/:id", adminAutentication, uploadProduto.single("foto"), produtoController.updateProduto);
router.delete("/produto/:id",adminAutentication, produtoController.deleteProduto);

//RELATORIO
router.get("/logs-login",adminAutentication, loginController.viewLogin);
router.get("/alteracao/produto", adminAutentication, produtoController.viewAlteracao);
router.get("/alteracao/pedido", adminAutentication, pedidoController.view_alteracao_estado_Pedido);

//METODO PAGAMENTO
router.get("/metodo_pagamento", adminAutentication || autenticar, metodo_pagamentoController.findOneMetodo_Pagamento);
router.patch("/metodo_pagamento", adminAutentication,metodo_pagamentoController.updateMetodo_Pagamento);

//CLIENTE
router.post("/cliente", clienteController.createUser);
router.get("/cliente/:id", autenticar || adminAutentication, clienteController.viewUser);
router.get("/cliente", adminAutentication, clienteController.viewAllUsers);
router.patch("/cliente/:id", autenticar, clienteController.updateUser);
router.delete("/cliente/:id", autenticar || adminAutentication, clienteController.deleteUser);

//PEDIDO
router.get("/admin/pedido/view", adminAutentication, pedidoController.viewAllOrders);
router.get("/pedido/view/:id",autenticar,pedidoController.viewUserOrder);
router.post("/pedido", autenticar, uploadComprovante.single("comprovante"), pedidoController.createOrder);
router.get("/pedido/comprovante/:id",autenticar || adminAutentication, pedidoController.serveComprovante);
router.patch("/pedido/update/:id", adminAutentication, pedidoController.updateOrder);


//AVALIAÇÃO
router.get("/avaliacao", adminAutentication, avaliacaoController.verAvaliacoes);
router.get("/avaliacao/produto/:id_produto", autenticar, avaliacaoController.verAvaliacoesProduto);
router.post("/avaliacao/:id_produto/:id_usuario", autenticar, avaliacaoController.createAvaliacao);
router.patch("/avaliacao/:id_produto/:id_usuario", autenticar, avaliacaoController.updateAvaliacao);
router.delete("/avaliacao/:id_produto/:id_usuario", autenticar, avaliacaoController.deleteAvaliacao);



module.exports = router;