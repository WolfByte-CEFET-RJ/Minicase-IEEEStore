const express = require("express");
const router = express.Router();
const {adminAutentication} = require("../middleware/adminAuth.js");
const adminController = require("../controller/adminController");
const loginController = require("../controller/loginController");
const produtoController = require("../controller/produtoController.js");

//ADMINISTRADOR
//Substituir autenticar por adminAutentication
router.get("/admin/:id",adminAutentication,adminController.viewAdmin);
router.post("/admin",adminController.createAdmin);
router.post("/admin/criar",adminAutentication,adminController.adminCreationPower);
router.post("/login",loginController.login);
router.patch("/admin/:id",adminAutentication,adminController.updateAdmin);
router.delete("/admin/:id",adminAutentication,adminController.deleteAdmin);

//PRODUTO
router.get("/produto/:id", produtoController.viewProdutoId);
router.post("/produto", produtoController.createProduto);


module.exports = router;
