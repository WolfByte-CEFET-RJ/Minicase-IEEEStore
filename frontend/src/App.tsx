
import Home from './components/pages/Home'
import { Routes, Route } from 'react-router'
import Product from './components/pages/Product'
import Signup from './components/pages/Signup'
import SignupAdm from './components/pages/SignupAdm'
import Login from './components/pages/Login'
import CoposeCanecas from './components/pages/Copos_e_Canecas'
import Camisas from './components/pages/Camisas'
import Bottons from './components/pages/Bottons'
import Ecobags from './components/pages/Ecobags'
import MeusFavoritos from './components/pages/Meus_Favoritos'
import MeuCarrinho from './components/pages/Meu_Carrinho'
import Page from './components/pages/Page'
import Header from './components/layout/Header'


function App() {

  return (
    <div className='flex flex-col w-full h-screen'>
        <Header />
        <Page>
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
            <Route path="/signup-adm" element={<SignupAdm />} />
          </Routes>
        </Page>
        
 
 
      </div>
  )
}

export default App
