import Page from './components/pages/Page'
import Home from './components/pages/Home'
import { Route, Routes } from 'react-router'
import Product from './components/pages/Product'
import Signup from './components/pages/Signup'
import Login from './components/pages/Login'
import Header from './components/layout/Header'
import './App.css'

function App() {


  return (
    <div className='flex flex-col h-screen'>
      <Header />
      <Page>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Page>
    </div>
  )
}

export default App
