import { useState } from 'react'
import {Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cart from './pages/Cart';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import CheckoutSuccess from './pages/checkout/CheckoutSuccess';
import NotFound from './pages/NotFound';
function App() {

  return (
    <>
    <ToastContainer />
    <Navbar/>
    <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/cart' element={<Cart />} />
    <Route path='/login' element={<Login />} />
    <Route path='/signup' element={<Signup />} />
    <Route path='/checkout-success' element={<CheckoutSuccess />} />
    <Route path='*' element={<NotFound />} />
    

    </Routes>
    </>
  )
}

export default App
