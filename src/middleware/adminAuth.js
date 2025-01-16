const { configDotenv } = require('dotenv');
const jwt = require('jsonwebtoken');
const knexConfig = require("../../knexfile.js");
const knex = require("knex")(knexConfig.development);
configDotenv();
const adminAutentication = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', ''); 
    if (!token) {
        return res.status(401).json({ message: 'Acesso negado.' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        if(decoded.role!=="admin"){
            return res.status(403).json({message:"Acesso negado! Não é administrador."})
        }
        req.userId = decoded.id; 
        const analysis = knex("administrador").select("*").where(req.userId).first();
        if(!analysis){
            return res.status(403).json({message: "Acesso negado! Não existe no banco"})
        }
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token inválido.' });
    }
};

module.exports = {adminAutentication};