const express = require("express");
const router = express.Router();
const {adminAutentication} = require("../middleware/adminAuth.js");
const adminController = require("../controller/adminController.js");
const loginController = require("../controller/loginController.js");
const produtoController = require("../controller/produtoController.js");
const {upload} = require("../middleware/upload");
const {autenticar} = require("../middleware/auth.js");

//ADMINISTRADOR
//Substituir autenticar por adminAutentication
router.get("/admin",adminAutentication,adminController.viewAdmin);
router.post("/admin/criar",adminAutentication,adminController.adminCreationPower);
router.post("/login",loginController.login);
router.patch("/admin",adminAutentication,adminController.updateAdmin);
router.delete("/admin",adminAutentication,adminController.deleteAdmin);

//PRODUTO
router.get("/produto/:id",adminAutentication || autenticar, produtoController.viewProdutoId);
router.get("/produto", adminAutentication || autenticar, produtoController.viewAllProduto);
router.post("/produto", adminAutentication, upload.single("foto"), produtoController.createProduto);
router.patch("/produto/:id", adminAutentication, upload.single("foto"), produtoController.updateProduto);
router.delete("/produto/:id",adminAutentication, produtoController.deleteProduto);


module.exports = router;
