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
        let {nome, preco, quantidade, media_avaliacao, qt_avaliacoes, qt_estrelas} = req.body;
        const foto = req.file.path;

        quantidade = parseInt(quantidade);
        preco = parseFloat(preco);
        
        if (!req.file){
            return req.stauts(400).json({status: false, message: "O arquivo da foto do produto é obrigatória."});
        }

        console.log("Dados recebidos no controller:", { nome, preco, quantidade, foto, qt_estrelas, qt_avaliacoes });
        const createService = await produtoServices.createProduto({ nome, preco, quantidade, foto, media_avaliacao, qt_estrelas, qt_avaliacoes });
        res.json({ status: true, message: createService });
    } catch (erro) {
        console.error("Erro no controller:", erro);
        res.json({ status: false, message: erro.message });
        }
}

async function updateProduto(req, res) {
    try {
        const id = req.params.id;
        const { nome, preco, quantidade, foto, qt_estrelas } = req.body; 
        console.log("Dados recebidos no controller:", { nome, preco, quantidade, foto, qt_estrelas });
        const mensagem = await produtoServices.updateProduto(id, { nome, preco, quantidade, foto, qt_estrelas });

        res.status(200).json({ status: true, message: mensagem });
    } catch (erro) {
        console.error("Erro no controller:", erro);
        res.status(400).json({ status: false, message: erro.message });
    }
}

async function deleteProduto(req, res) {
    try {
        const { id } = req.params;
        const deleteproduto = await produtoServices.deleteProduto(id);
        res.json({ status: true, message: deleteproduto });
        console.log("Controlador executado.");
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: error.message });
    }
}

module.exports = {
    viewProdutoId,
    viewAllProduto,
    createProduto,
    updateProduto,
    deleteProduto
};
