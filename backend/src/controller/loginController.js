const loginServices = require("../services/loginService.js");
async function login(req,res){
    try{
        const {cpf,email,senha} = req.body;
        if(cpf){
            const loginService = await loginServices.login({cpf,email,senha});
            res.json({status: true, message: loginService});
        }
        else if(email){
            const loginService = await loginServices.login({cpf,email,senha});
            res.json({status:true,message:loginService});
        }
        
        console.log("Controlador executado.");
    }catch(error){
        console.log(error);
        res.json({status:false, message: error.message});
    }
}

async function viewLogin(req,res) {
    try{
        const logsService = await loginServices.viewLogin();
        res.json({status:true,message:logsService})
    }catch(err){
        console.log(err);
        res.json({status:false,message:err.message})
    }
    
}

module.exports = {
    login,viewLogin,
};