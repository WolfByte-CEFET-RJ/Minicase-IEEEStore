function ProdutosAdq() {
    const produtos = [
        { nome: "Camisa preta", preco: 50, imagem: "https://cdn.sistemawbuy.com.br/arquivos/13ef42c661356c967c0cee1859873499/produtos/65a9930f70caf/preta-frente-65de22e549c56.jpg" },
        { nome: "Camisa preta", preco: 50, imagem: "https://cdn.sistemawbuy.com.br/arquivos/13ef42c661356c967c0cee1859873499/produtos/65a9930f70caf/preta-frente-65de22e549c56.jpg" },
        { nome: "Camisa preta", preco: 50, imagem: "https://cdn.sistemawbuy.com.br/arquivos/13ef42c661356c967c0cee1859873499/produtos/65a9930f70caf/preta-frente-65de22e549c56.jpg" }
    ];

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-8">Produtos adquiridos</h1>
    
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {produtos.map((produto, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <img src={produto.imagem} alt={produto.nome} className="w-full h-54 object-cover" />

                        <div className="p-4">
                            <p className="text-lg font-bold">Nome: <span className="font-normal">{produto.nome}</span></p>
                            <p className="text-lg font-bold">Preço: <span className="font-normal">R$ {produto.preco}</span></p>
                            
                            <div className="mt-2 mb-4">
                                <label className="text-lg font-bold">Avaliação de 0 a 5: </label>
                                <input
                                    type="number"
                                    min="0"
                                    max="5"
                                    className="border border-gray-400 rounded-md px-2 py-1 w-16 ml-2"
                                />
                            </div>

                            <button className="w-full bg-[#0D5FAA] hover:bg-blue-900 text-white text-lg font-semibold px-4 py-2 rounded-md">
                                Avaliar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProdutosAdq;
