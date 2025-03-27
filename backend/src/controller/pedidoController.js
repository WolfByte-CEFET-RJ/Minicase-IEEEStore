const pedidoServices = require("../services/pedidoServices.js");




async function viewAllOrders(req,res){
    try{
      const viewAllPedidoService = await pedidoServices.viewAllOrders();
      res.status(200).json({status: true, viewAllPedidoService});
    }catch(err){
      console.log(err);
      res.status(500).json({status: false, message: err.message})
    }
  }
  


async function viewUserOrder(req,res){
    try{
        const userId = req.params.id;
        console.log("aaa",userId);
        console.log("bbb",req.userId);
        if(parseInt(userId)!==parseInt(req.userId)){
            return  res.status(403).json({message:"Acesso negado"});
            
        }
        const viewOwnOrder = await pedidoServices.viewUserOrder(userId);
        if(!viewOwnOrder){
            throw new Error("Não há pedidos deste cliente.");
        }
        res.status(200).json({status:true, message: viewOwnOrder});

    }catch(err){
        res.status(500).json({status:false, message: err.message});
    }
}

async function createOrder(req, res) {
    try {
        const { id_usuario,preco_final, metodo_pagamento, comprovante, estado_pedido, mensagem } = req.body;
        
        const pedidoService = await pedidoServices.createOrder({
            preco_final,
            metodo_pagamento,
            comprovante,
            estado_pedido,
            mensagem,
            id_usuario
        });
        
        res.json({ status: true, message: pedidoService });
        
    } catch (erro) {
        console.log(erro);
        res.json({ status: false, message: erro.message });
    }
}

module.exports = {
    createOrder,
    viewUserOrder,
    viewAllOrders,
};
