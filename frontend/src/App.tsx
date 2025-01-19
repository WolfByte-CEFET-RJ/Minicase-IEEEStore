
import Home from './components/pages/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Product from './components/pages/Product'
import Signup from './components/pages/Signup'
import Login from './components/pages/Login'
import './App.css'
import CoposeCanecas from './components/pages/Copos_e_Canecas'
import Camisas from './components/pages/Camisas'
import Bottons from './components/pages/Bottons'
import Ecobags from './components/pages/Ecobags'
import MeusFavoritos from './components/pages/Meus_Favoritos'
import MeuCarrinho from './components/pages/Meu_Carrinho'

function App() {

  return (
    <Router>
      <div className='flex flex-col w-full h-screen'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Product />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/coposecanecas" element={<CoposeCanecas />} />
            <Route path="/camisas" element={<Camisas />} />
            <Route path="/bottons" element={<Bottons />} />
            <Route path="/ecobags" element={<Ecobags />} />
            <Route path="/meus-favoritos" element={<MeusFavoritos />} />
            <Route path="/meu-carrinho" element={<MeuCarrinho />} />
          </Routes>
        
      </div>
    </Router>
  )
}

export default App
