const avaliacaoServices = require("../services/avaliacaoServices.js");

async function verAvaliacoes(req,res){
    try{
        const verAvaliacoes = await avaliacaoServices.verAvaliacoes();
        res.json({status: true, message: verAvaliacoes});
        console.log("controlador executado");
    }catch(erro){
        res.json({status: false, message: erro.message});
    }
}

async function verAvaliacoesProduto(req, res) {
    try {
      const { id_produto } = req.params;
  
      if (!id_produto) {
        throw new Error("O parâmetro id_produto é obrigatório.");
      }

      const verAvaliacoes = await avaliacaoServices.verAvaliacoesProduto(Number(id_produto));
  
      res.json({ status: true, data: verAvaliacoes });
      console.log("controlador executado");
  
    } catch (erro) {
      res.json({ status: false, message: erro.message });
    }
  }


async function createAvaliacao(req, res) {
    try {
      const { id_produto, id_usuario } = req.params;
      const { qt_estrelas } = req.body;
      const nota = parseFloat(qt_estrelas);
  
      const resultado = await avaliacaoServices.createAvaliacao(
        Number(id_produto),
        Number(id_usuario),
        nota
      );
  
      res.json({ status: true, message: resultado });
  
    } catch (erro) {
      console.error("Erro no controller:", erro);
      res.json({ status: false, message: erro.message });
    }
  }
  
  async function updateAvaliacao(req, res) {
    try {
      const { id_produto, id_usuario } = req.params;
      const { qt_estrelas } = req.body;
  
      const nota = parseFloat(qt_estrelas);
  
      const resultado = await avaliacaoServices.updateAvaliacao(
        Number(id_produto),
        Number(id_usuario),
        nota
      );
  
      res.status(200).json({ status: true, message: resultado.message });
  
    } catch (erro) {
      console.error("Erro ao atualizar avaliação:", erro.message);
      res.status(400).json({ status: false, message: erro.message });
    }
  }

  async function deleteAvaliacao(req, res) {
    try {
      const { id_produto, id_usuario } = req.params;
  
      const resultado = await avaliacaoServices.deleteAvaliacao(
        Number(id_produto),
        Number(id_usuario)
      );
  
      res.status(200).json({ status: true, message: resultado.message });
  
    } catch (erro) {
      console.error("Erro ao deletar avaliação:", erro.message);
      res.status(400).json({ status: false, message: erro.message });
    }
  }


module.exports = {
    verAvaliacoes,
    verAvaliacoesProduto,
    createAvaliacao,
    updateAvaliacao,
    deleteAvaliacao
};