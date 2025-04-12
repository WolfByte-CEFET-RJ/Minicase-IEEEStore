const pedidoServices = require("../services/pedidoServices.js");



async function serveComprovante(req,res){
    try{
        const {id} = req.params;
        const comprovante = await pedidoServices.serveComprovante(id);
        res.sendFile(comprovante);
        
    }catch(err){
        res.status(500).json({message:"Erro ao enviar conseguir o comprovante"})
    }
}


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
        const carrinho = JSON.parse(req.body.carrinho);

        let {
            id_user,
            produtos,
            preco_final
        } = carrinho;

        if (parseInt(id_user) !== parseInt(req.userId)) {
            return res.status(403).json({ message: "Acesso negado: você não pode fazer pedidos em nome de outro usuário." });
        }

        const metodo_pagamento = req.body.metodo_pagamento;
        const estado_pedido = req.body.estado_pedido;
        const mensagem = req.body.mensagem;
        const comprovante = req.file.path;

        if(typeof produtos === "string") {
            try{
              produtos = JSON.parse(produtos);
            }catch (erro){
              return res.json({ status: false, message: "Formato inválido no campo 'produtos'" });
            }
          }

        preco_final = parseFloat(preco_final);

        if (isNaN(id_user)) {
            return res.json({ status: false, message: "ID do usuário inválido" });
        }

        id_user = parseInt(id_user);

        const id_usuario = id_user

        const pedidoService = await pedidoServices.createOrder({
            id_usuario,
            preco_final,
            metodo_pagamento,
            comprovante,
            estado_pedido,
            mensagem,
            produtos,            
        });
        
        
        res.json({ status: true, message: pedidoService });
        
    } catch (erro) {
        console.log(erro);
        res.json({ status: false, message: erro.message });
    }
}

async function updateOrder(req, res){
    try{
        const {id} = req.params;
        const {id_usuario, preco_final, metodo_pagamento, comprovante, estado_pedido, mensagem} = req.body;
       
        const updateOrder = await pedidoServices.updateOrder({
           id, estado_pedido, mensagem
        });
   
        res.json({status: true, message: updateOrder});

    }catch(erro){
        console.log(erro);
        res.json({status: false, message: erro.message});
    }
}

module.exports = {
    createOrder,
    viewUserOrder,
    viewAllOrders,
    serveComprovante,
    updateOrder,
};
