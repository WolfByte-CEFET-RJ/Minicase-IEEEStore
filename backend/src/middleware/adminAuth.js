const { configDotenv } = require("dotenv");
const jwt = require("jsonwebtoken");
const knexConfig = require("../../knexfile.js");
const adminServices = require("../services/adminServices.js");
knex = require("knex")(knexConfig.development);
configDotenv();
const adminAutentication = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "Acesso negado." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Acesso negado! 2 " });
    }
    req.userId = decoded.id;
    const analysis = await adminServices.checkAdminId(req.userId);
    if (!analysis) {
      return res.status(403).json({ message: "Acesso negado! 3" });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido." });
  }
};

module.exports = { adminAutentication };
