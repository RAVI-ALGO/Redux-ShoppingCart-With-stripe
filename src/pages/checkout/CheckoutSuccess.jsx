import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { CartSlice } from "../../components/store/features/CartSlice";

const CheckoutSuccess = ()=>{
  const dispatch = useDispatch()

    useEffect(() => {
        dispatch(CartSlice.actions.clearCart())  
    }, [])
    
    return(
        <div className="checkout-success">Done</div>
    )
}

export default CheckoutSuccess;