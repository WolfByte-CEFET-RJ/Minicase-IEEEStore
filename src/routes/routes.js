const express = require("express");
const router = express.Router();
const {autenticar} = require("../middleware/auth.js");
const {adminAutentication} = require("../middleware/adminAuth.js");
const adminController = require("../controller/adminController");

//ADMINISTRADOR
router.get("/admin/:id",autenticar,adminController.viewAdmin)
router.post("/admin",adminController.createAdmin);
router.post("/admin/criar",adminAutentication,adminController.adminCreationPower)
router.post("/admin/login",adminController.loginAdmin);
router.patch("/admin/:id",autenticar,adminController.updateAdmin);
router.delete("/admin/:id",autenticar,adminController.deleteAdmin);

module.exports = router;
