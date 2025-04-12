
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
import SignupProduct from './components/pages/product/SignupProduct'
import EditProduct from './components/pages/product/EditProduct'
import Payment from './components/pages/Payment'
import Perfil from './components/pages/Perfil'
import UserProvider from './context/userProvider'
import ListProduct from './components/pages/product/ListProduct'
import UserList from './components/pages/Lista_de_usuarios'
import PaymentDetails from './components/pages/PaymentDetails'
import MyOrders from './components/pages/MyOrders'

function App() {

  return (
    <div className='flex flex-col w-full h-screen'>
        <UserProvider>
          <Header />
          <Page>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/coposecanecas" element={<CoposeCanecas />} />
              <Route path="/camisas" element={<Camisas />} />
              <Route path="/bottons" element={<Bottons />} />
              <Route path="/ecobags" element={<Ecobags />} />
              <Route path="/meus-favoritos" element={<MeusFavoritos />} />
              <Route path="/meu-carrinho" element={<MeuCarrinho />} />
              <Route path="/signup-adm" element={<SignupAdm />} />
              <Route path="/signup-product" element={<SignupProduct />} />
              <Route path="/editar-produto/:id" element={<EditProduct />} />
              <Route path="/alterar-pagamento" element={<Payment />} />
              <Route path="/detalhes-de-pagamento" element={<PaymentDetails />} />
              <Route path="/meu-perfil/:id" element={<Perfil />} />
              <Route path="listar-produtos" element={<ListProduct />} />
              <Route path="listar-usuarios" element={<UserList />} />
              <Route path="meus-pedidos" element={<MyOrders />} />
            </Routes>
          </Page>
        </UserProvider>
      </div>
  )
}

export default App
