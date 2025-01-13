const express = require("express");
const router = express.Router();
const {adminAutentication} = require("../middleware/adminAuth.js");
const adminController = require("../controller/adminController");

//ADMINISTRADOR
//Substituir autenticar por adminAutentication
router.get("/admin/:id",adminAutentication,adminController.viewAdmin)
router.post("/admin",adminController.createAdmin);
router.post("/admin/criar",adminAutentication,adminController.adminCreationPower)
router.post("/admin/login",adminController.loginAdmin);
router.patch("/admin/:id",adminAutentication,adminController.updateAdmin);
router.delete("/admin/:id",adminAutentication,adminController.deleteAdmin);

module.exports = router;
