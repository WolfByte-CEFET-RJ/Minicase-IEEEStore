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

const isValidDate= (dateString) => {
  return !isNaN(new Date(dateString));
};

async function viewLogin(req,res) {
    try{
        const inicio = req.query.inicio;
        const fim = req.query.fim;
        if(!isValidDate(inicio)||!isValidDate(fim)){
            return res.status(400).json({status:false, message: "O formato deve ser DD-MM-AAAA"});
        }
        const dataInicio = new Date(inicio);
        const dataFim = new Date(fim);    
        console.log(dataFim);
        console.log(dataInicio)
        const logsService = await loginServices.viewLogin(dataInicio,dataFim);
        res.json({status:true,message:logsService})
    }catch(err){
        console.log(err);
        res.json({status:false,message:err.message})
    }
    
}

module.exports = {
    login,viewLogin,
};