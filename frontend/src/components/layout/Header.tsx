import logo from "../../assets/logo.png"
import { useState } from "react"
import { Link } from "react-router";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAdm, setIsAdm] = useState(true)

  return (
    <div className="w-full"> {/*Container 1*/}
      {/*Logo*/}
      <header className="flex justify-between items-center text-white py-6 px-8 md:px-32 bg-[#0D5FAA]">
        <Link to="/">
          <img
            src={logo}
            alt=""
            className="w-52 hover:scale-110 transition-all"
          ></img>
        </Link>

      {/*Container 2*/}
        <div className="w-2/5 flex flex-col gap-y-5">
          {/*Barra de busca*/}
          <div className="relative flex justify-center">
            <i className="bx bx-search absolute right-3 top-1/2 transform -translate-y-1/2 text-2xl text-gray-500"></i>
            <input
              type="text"
              placeholder="Busque aqui um produto..."
              className="w-full py-2 pl-5 pr-10 rounded-2xl border-2 border-blue-300 focus:outline-sky-500 text-black"
            />
          </div>

          {/*Lista de navegação*/}
          <ul className="flex justify-center items-center gap-12 font-semibold text-base">
            <li className="p-3 hover:bg-sky-700 hover:text-black rounded-md transition-all cursor-pointer">
              <Link to="/coposecanecas">Copos e canecas</Link>
            </li>
            <li className="p-3 hover:bg-sky-700 hover:text-black rounded-md transition-all cursor-pointer">
              <Link to="/camisas">Camisas</Link>
            </li>
            <li className="p-3 hover:bg-sky-700 hover:text-black rounded-md transition-all cursor-pointer">
              <Link to="/bottons">Bottons</Link>
            </li>
            <li className="p-3 hover:bg-sky-700 hover:text-black rounded-md transition-all cursor-pointer">
              <Link to="/ecobags">Ecobags</Link>
            </li>
          </ul>
        </div>

      {/*Container 3*/}
        <div className="flex flex-col gap-y-5 max-w-full">
          <div className="flex gap-20 items-center pl-8">
            {/*Botões ícones interativos(páginas de carrinho e de favoritos-opcional)*/}
            <Link to="/meus-favoritos">
              <i className="bx bx-heart bx-lg bx-tada-hover" style={{ cursor: "pointer" }}></i>
            </Link>
            <Link to="/meu-carrinho">
              <i className="bx bx-cart bx-lg bx-tada-hover" style={{ cursor: "pointer" }}></i>
            </Link>

          {/*Ícone do menu*/}
            <i
              className="bx bx-menu block text-5xl cursor-pointer absolute top-6 right-8 z-50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}>
            </i>
 
            {/*Menu lateral*/}
            {!isAdm ? (
              <div
              className={`absolute top-0 right-0 h-screen w-1/4 bg-[#0D5FAA] flex flex-col items-center gap-6 font-semibold transition-transform duration-300 z-40
              ${isMenuOpen ? "translate-x-0 opacity-100 pointer-events-auto" : "-translate-x-full opacity-0 pointer-events-none"}`}
              style={{ transition: "transform 0.3s ease, opacity 0.3s ease" }}>
                
                <h1 className="mt-8 text-3xl underline pb-5">Menu</h1>
                <ul className="w-full mt-12">
                  <li className="p-3 hover:bg-sky-700 hover:text-black rounded-md transition-all cursor-pointer">
                    <Link to="/todos-os-produtos">Todos os produtos</Link>
                  </li>
                  <li className="p-3 hover:bg-sky-700 hover:text-black rounded-md transition-all cursor-pointer">
                    <Link to="/camisas">Camisas</Link>
                  </li>
                  <li className="p-3 hover:bg-sky-700 hover:text-black rounded-md transition-all cursor-pointer">
                    <Link to="/coposecanecas">Copos e canecas</Link>
                  </li>
                  <li className="p-3 hover:bg-sky-700 hover:text-black rounded-md transition-all cursor-pointer">
                    <Link to="/bottons">Bottons</Link>
                  </li>
                  <li className="p-3 hover:bg-sky-700 hover:text-black rounded-md transition-all cursor-pointer">
                    <Link to="/ecobags">Ecobags</Link>
                  </li>
                  <li className="p-3 hover:bg-sky-700 hover:text-black rounded-md transition-all cursor-pointer">
                    <Link to="/meus-pedidos">Meus pedidos</Link>
                  </li>
                  <li className="p-3 hover:bg-sky-700 hover:text-black rounded-md transition-all cursor-pointer">
                    <Link to="/meu-perfil">Meu perfil</Link>
                  </li>
                </ul>
              </div>
            ) : (
              <div
              className={`absolute top-0 right-0 h-screen w-1/4 bg-[#0D5FAA] flex flex-col items-center gap-6 font-semibold transition-transform duration-300 z-40
              ${isMenuOpen ? "translate-x-0 opacity-100 pointer-events-auto" : "-translate-x-full opacity-0 pointer-events-none"}`}
              style={{ transition: "transform 0.3s ease, opacity 0.3s ease" }}>
                
                <h1 className="mt-8 text-3xl underline pb-5">Menu</h1>
                <ul className="w-full mt-12">
                  <li className="p-3 hover:bg-sky-700 hover:text-black rounded-md transition-all cursor-pointer">
                    <Link to="/todos-os-produtos">Cadastrar Produto</Link>
                  </li>
                  <li className="p-3 hover:bg-sky-700 hover:text-black rounded-md transition-all cursor-pointer">
                    <Link to="/camisas">Aba de pedidos</Link>
                  </li>
                  <li className="p-3 hover:bg-sky-700 hover:text-black rounded-md transition-all cursor-pointer">
                    <Link to="/coposecanecas">Lista de usuários</Link>
                  </li>
                  <li className="p-3 hover:bg-sky-700 hover:text-black rounded-md transition-all cursor-pointer">
                    <Link to="/bottons">Lista de produtos</Link>
                  </li>
                  <li className="p-3 hover:bg-sky-700 hover:text-black rounded-md transition-all cursor-pointer">
                    <Link to="/ecobags">Relatórios</Link>
                  </li>
                  <li className="p-3 hover:bg-sky-700 hover:text-black rounded-md transition-all cursor-pointer">
                    <Link to="/meu-perfil">Meu perfil</Link>
                  </li>
                </ul>
              </div>
            )}
            {/*Overlay para destacar a abertura do menu*/}
            {isMenuOpen && (
                <div
                  className="fixed inset-0 bg-black bg-opacity-50 z-30"
                  onClick={() => setIsMenuOpen(false)}
                ></div>
              )}
          </div>

          <div>
            <ul className="flex gap-10 font-semibold text-base pr-6">
              <li className="p-3 hover:bg-sky-700 hover:text-black rounded-md transition-all cursor-pointer">
                <Link to="/signup">Cadastrar-se</Link>
              </li>
              <li className="p-3 hover:bg-sky-700 hover:text-black rounded-md transition-all cursor-pointer">
                <Link to="login">Entrar</Link>
              </li>
            </ul>
          </div>  
        </div>
      </header>
    </div>
  );
}

export default Header;
