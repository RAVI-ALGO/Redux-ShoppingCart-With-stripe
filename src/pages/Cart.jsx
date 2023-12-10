import React, { useEffect, useState } from 'react';
import "./cart.css";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CartSlice } from '../components/store/features/CartSlice';
import axios from 'axios'
import {PuffLoader} from 'react-spinners'
const Cart = () => {
  const navigate = useNavigate()
  const cart = useSelector((state) => state.cart)
  const auth = useSelector((state)=>state.auth)

  const dispatch = useDispatch()
  const products = [
    {
      id: 1,
      title: "Product 1",
      description: "I am a product 1",
      price: 10,
      quantity: 2,
      img: "https://source.unsplash.com/collection/928424/480x480"
    },
    {
      id: 2,
      title: "Product 2",
      description: "I am a product 2",
      price: 15,
      quantity: 1,
      img: "https://source.unsplash.com/collection/928423/480x480"
    },
    {
      id: 3,
      title: "Product 3",
      description: "I am a product 1",
      price: 10,
      quantity: 2,
      img: "https://source.unsplash.com/collection/928424/480x480"
    },
    {
      id: 4,
      title: "Product 4",
      description: "I am a product 2",
      price: 15,
      quantity: 1,
      img: "https://source.unsplash.com/collection/928423/480x480"
    },
  ]
  const [isApiLoading,setIsApiLoading]=useState(false)
  useEffect(() => {
    dispatch(CartSlice.actions.getCartTotal())

  }, [cart])


  const handleRemoveCartProduct = (item) => {
    dispatch(CartSlice.actions.removeFromCart(item))
  }

  const handleDecreaseQuantity = (item) => {
    dispatch(CartSlice.actions.decreaseCartQuantity(item))
  }

  const handleIncreaseQuantity = (item) => {
    dispatch(CartSlice.actions.addToCart(item))
  }

  const handleClearCart = () => {
    dispatch(CartSlice.actions.clearCart())
  }
  const handleCheckout = async() => {
    setIsApiLoading(true)
    console.log(cart.cartItems);
   await axios.post("http://localhost:5000/api/payment/create-checkout-session", { cartItems:cart.cartItems,userId:auth._id}).then((res)=>{
    if(res.data.url)
    {
    setIsApiLoading(false)
      window.location.href = res.data.url
    }
   }).catch((err)=>{
    setIsApiLoading(false)
    console.log(err.message)});
  }
  return (
  <>
  {isApiLoading ? (
          <div
            style={{
              width: "100%",
              height: "72vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PuffLoader
              loading={true}
              color="#0C4A6E"
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : (
<div className="container my-3">
      <div className='d-flex justify-content-between my-5'>
        <div>
          <h2>Your Cart</h2>
        </div>
        <div>
          <button className='btn btn-outline-dark btn-sm' onClick={() => navigate('/')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-skip-backward" viewBox="0 0 16 16">
              <path d="M.5 3.5A.5.5 0 0 1 1 4v3.248l6.267-3.636c.52-.302 1.233.043 1.233.696v2.94l6.267-3.636c.52-.302 1.233.043 1.233.696v7.384c0 .653-.713.998-1.233.696L8.5 8.752v2.94c0 .653-.713.998-1.233.696L1 8.752V12a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm7 1.133L1.696 8 7.5 11.367V4.633zm7.5 0L9.196 8 15 11.367V4.633z" />
            </svg>
            <span className='mt-2'>
              &nbsp;Continue Shopping
            </span>

          </button>
        </div>
      </div>
      {
        (cart?.cartItems.length === 0)
          ?
          <div>
            <div className="container mt-5">
              <div className="row justify-content-center">
                <div className="col-md-6">
                  <div className="card text-center">
                    <div className="card-body border border-0">
                      <h2 className="card-title">Your Cart is <span className='text-danger'>Empty!</span></h2>
                      <img
                        src="https://i0.wp.com/www.huratips.com/wp-content/uploads/2019/04/empty-cart.png?fit=603%2C288&ssl=1" // Replace with the path to your empty cart image
                        alt="Empty Cart"
                        className="img-fluid mb-3"
                        width="250px"
                      />
                      <p className="card-text"><button onClick={() => navigate("/")} className='btn btn-outline-dark'>Start Shopping</button>.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          :
          <>
            <div className="table-responsive" style={{ maxHeight: '230px', overflowY: 'auto' }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cart?.cartItems.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <img src={item.img} alt={item.title} width="80" height="80" />
                      </td>
                      <td>
                        <p style={{ maxWidth: "250px" }}>{(item.title.length > 50 ? item.title.slice(0, 50) + "..." : item.title)}</p>
                      </td>
                      <td>&#x20B9;{item.price.toFixed(2)}</td>
                      <td>
                        <div className="d-flex justify-content-start">
                          <button
                            className="btn btn-sm btn-info mr-2"
                            title='Decrease Quantity'
                            onClick={() => handleDecreaseQuantity(item)}
                          >
                            -
                          </button>
                          <span className='mx-2 my-1'>{item.cartQuantity}</span>
                          <button
                            className="btn btn-sm btn-info ml-2"
                            title='Increase Quantity'
                            onClick={() => handleIncreaseQuantity(item)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>&#x20B9;{(item.price * item.cartQuantity).toFixed(2)}</td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          title='Remove'
                          onClick={() => handleRemoveCartProduct(item)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-right my-3">
              <div className='d-flex justify-content-end'>
                <h3>Sub Total: &#x20B9;{cart.cartTotalAmount.toFixed(2)}</h3>
              </div>
              <div className='d-flex justify-content-between my-2'>
                <button onClick={() => handleClearCart()} className="btn btn-danger mr-2">
                  Clear Cart
                </button>
                <button onClick={() => { handleCheckout() }} className={localStorage.getItem('login') == 1 ? 'btn btn-success' : 'btn btn-warning text-white '} disabled={localStorage.getItem('login') == 1 ? false : true} >
                  {localStorage.getItem('login') == 1 ? 'Checkout' : 'Login to checkout'}
                </button>
              </div>

            </div>
          </>
      }
    </div>)
  }
  </>
    
  );
};

export default Cart;
