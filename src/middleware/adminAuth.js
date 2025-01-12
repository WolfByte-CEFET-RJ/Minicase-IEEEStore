const { configDotenv } = require('dotenv');
const jwt = require('jsonwebtoken');
configDotenv();
const adminAutentication = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', ''); 

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado.' });
    }

    try {
       
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userId = decoded.id; 
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token inválido.' });
    }
};

module.exports = {adminAutentication};