import Page from './components/pages/Page'
import Home from './components/pages/Home'
import { Route, Routes } from 'react-router'
import Product from './components/pages/Product'
import Signup from './components/pages/Signup'
import './App.css'

function App() {


  return (
    <>
      <Page>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Page>
    </>
  )
}

export default App
