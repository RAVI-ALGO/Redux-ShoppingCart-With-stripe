import React from "react";
import { useDispatch } from "react-redux";
import { CartSlice } from "../components/store/features/CartSlice";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleAddToCart = () =>{
    dispatch(CartSlice.actions.addToCart(product))
    navigate("/cart")
  }
  return (
    <>
      <div className="card shadow" style={{width:"320px"}}>
      <div className="d-flex justify-content-center">
      <img src={product.img} className="card-img-top" alt="..." style={{height:"250px",width:"80%"}}/>
      </div>
        
        <div className="card-body d-flex align-content-end">
        <div >
          <div className="d-flex justify-content-between">
            <h5 className="card-title">{product.title}</h5>
            <p className="card-text">&#x20B9;{product.price.toFixed(2)}</p>
          </div>
          <p className="card-text">{(product.description.length >100 ? product.description.slice(0, 100) + "..." : product.description)}</p>
          <button className="btn btn-outline-primary w-100" onClick={()=>handleAddToCart(product)}>Add To Cart</button>
        </div>
        </div>
      </div>
    </>
    
  );
};

export default ProductCard;
