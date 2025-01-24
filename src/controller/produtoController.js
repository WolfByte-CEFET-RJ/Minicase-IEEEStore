const produtoServices = require("../services/produtoServices.js");

async function viewProdutoId(req, res) {
    try {
        const { id } = req.params;
        console.log("ID recebido:", id);
        const readService = await produtoServices.viewProdutoId(id);  
        
        if (!readService) {
            return res.status(404).json({ status: false, message: "Produto não encontrado." });
        }

        res.status(200).json({ status: true, message: "Produto encontrado", produto: readService });
        console.log("Controlador executado com sucesso");
    } catch (erro) {
        console.log(erro);
        res.status(500).json({ status: false, message: "Erro ao buscar o produto. " + erro.message });
    }
}

async function viewAllProduto(req, res){
    try{
        const readAllService = await produtoServices.viewAllProduto();
        res.json({status: true, message: readAllService});
        console.log("Controlador executado.");        
    }catch(erro){
        console.error("Erro no controller:", erro);
        res.jons({status: false, message: erro.message});
}
}
async function createProduto(req, res) {
    try {
        const { nome, preco, disponivel, foto, qt_estrelas } = req.body;
        console.log("Dados recebidos no controller:", { nome, preco, disponivel, foto, qt_estrelas });
        const createService = await produtoServices.createProduto({ nome, preco, disponivel, foto, qt_estrelas });
        res.json({ status: true, message: createService });
    } catch (erro) {
        console.error("Erro no controller:", erro);
        res.json({ status: false, message: erro.message });
        }
}


module.exports = {
    viewProdutoId,
    viewAllProduto,
    createProduto,
};
