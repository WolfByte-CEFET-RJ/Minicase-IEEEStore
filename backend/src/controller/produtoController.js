const produtoServices = require("../services/produtoServices.js");
const express = require("express");
const { verAvaliacoes } = require("./avaliacaoController.js");

async function serveImage(req,res){
    try{
        const {id} = req.params;
        const imagem = await produtoServices.serveImage(id);
        res.sendFile(imagem);
        
    }catch(err){
        res.status(500).json({message:"Erro ao enviar imagem"})
    }
}

const isValidDate = (dateString) => {
  return !isNaN(new Date(dateString));
};

async function viewAlteracao(req,res){
    try{

        const inicio = req.query.inicio;
        const fim = req.query.fim;

        if(!isValidDate(inicio)||!isValidDate(fim)){
            return res.status(400).json({status:false, message: "O formato deve ser DD-MM-AAAA"});
        }

        const dataInicio = new Date(inicio);
        const dataFim = new Date(fim);

        const viewAlteracaoService = await produtoServices.viewAlteracao(dataInicio,dataFim);
        res.json({status: true, message: viewAlteracaoService});
        console.log("controlador executado");
    }catch(error){
        console.error("Erro no controller", error)
        res.json({status: false, message: error.message});
    }
}
async function viewProdutoId(req, res) {
    try {
        const { id } = req.params;
        console.log("ID recebido:", id);
        const readService = await produtoServices.viewProdutoId(id);  

        
        if (!readService) {
            return res.status(404).json({ status: false, message: "Produto não encontrado." });
        }

        res.status(200).json({
            status: true,
            message: "Produto encontrado",
            produto: readService.produto,
            media_avaliacoes: readService.media_avaliacoes,
            quantidade_avaliacoes: readService.quantidade_avaliacoes,
            avaliacoes: readService.avaliacoes

        });
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
        res.json({status: false, message: erro.message});
}
}
async function createProduto(req, res) {
    try {
        let {nome, preco, quantidade, media_avaliacao} = req.body;
        const foto = req.file.path;
        

        quantidade = parseInt(quantidade);
        preco = parseFloat(preco);
        
        if (!req.file){
            return req.stauts(400).json({status: false, message: "O arquivo da foto do produto é obrigatória."});
        }

        console.log("Dados recebidos no controller:", { nome, preco, quantidade, foto, media_avaliacao });
        const createService = await produtoServices.createProduto({ nome, preco, quantidade, foto, media_avaliacao, });
        res.json({ status: true, message: createService });
    } catch (erro) {
        console.error("Erro no controller:", erro);
        res.json({ status: false, message: erro.message });
        }
}



async function updateProduto(req, res) {
    try {
        const id_admin = req.userId;
        const id = req.params.id;
        let { nome, preco, quantidade} = req.body;
        const foto = req.file ? req.file.path : null;

        if (preco !== undefined) preco = parseFloat(preco);
        if (quantidade !== undefined) quantidade = parseInt(quantidade);

        console.log("Dados recebidos no controller:", { nome, preco, quantidade, foto });
        const resultado = await produtoServices.updateProduto(id,id_admin,nome, preco, quantidade, foto);

        if (resultado) {
            res.status(200).json({resultado});
        } else {
            res.status(400).json({resultado});
        }
    } catch (erro) {
        console.log("Erro no controller:", erro);
        res.status(500).json({ status: false, message: erro.message });
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
    deleteProduto,
    viewAlteracao,
    serveImage,
};
