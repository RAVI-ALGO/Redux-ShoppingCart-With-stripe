import React from 'react'
import ProductPage from './ProductPage'
import { useSelector } from 'react-redux'

const Home = () => {
  const auth = useSelector((state)=>state.auth)
  console.log("auth",auth);
  return (
    <>
    <title>Home</title>
    <ProductPage/>
    </>
   
  )
}

export default Home