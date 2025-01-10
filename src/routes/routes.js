const express = require("express");
const router = express.Router();

const adminController = require("../controller/adminController");

homeRouter.get("/",(req,res)=>{
    res.status(200).json({message:"oba!!!"})
})

//ADMINISTRADOR
router.post("/admin", adminController.createAdmin);

module.exports = router;
