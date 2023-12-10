import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const initialState = {
    cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems")) : [],
    cartTotalQuentity: 0,
    cartTotalAmount: 0,
    status: null
}
const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id)

            if (itemIndex >= 0) {


                state.cartItems[itemIndex].cartQuantity += 1;

                toast.info(`Increased ${state.cartItems[itemIndex].title} cart quantity`, {
                    position: "bottom-left"
                })
            } else {

                const tempProduct = { ...action.payload, cartQuantity: 1 }
                state.cartItems.push(tempProduct)

                toast.success(`${action.payload.title} added to cart`, {
                    position: "bottom-left"
                })
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))

        },
        removeFromCart(state, action) {
            const newCartItems = state.cartItems.filter((item) => {
                return (item.id !== action.payload.id) && item
            })

            state.cartItems = newCartItems

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
            toast.warning(`${action.payload.title} removed from cart`, {
                position: "bottom-left"
            })
        },
        decreaseCartQuantity(state, action) {
            const itemIndex = state.cartItems.findIndex((cartItem) => {
                return cartItem.id === action.payload.id
            })
            if (state.cartItems[itemIndex].cartQuantity > 1) {
                state.cartItems[itemIndex].cartQuantity -= 1

                toast.info(`Decreased ${action.payload.title} cart quantity`, {
                    position: "bottom-left"
                })
            } else if (state.cartItems[itemIndex].cartQuantity === 1) {
                const newCartItems = state.cartItems.filter((item) => {
                    return (item.id !== action.payload.id) && item
                })

                state.cartItems = newCartItems

                toast.warning(`${action.payload.title} removed from cart`, {
                    position: "bottom-left"
                })
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        }
        ,
        clearCart(state, action) {
            state.cartItems = []
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
            toast.success(`All the items removed from cart`, {
                position: "bottom-left"
            })
        }
        ,
        getCartTotal(state, action) {
            let {total,quantity} = state.cartItems.reduce((cartTotal,cartItem)=>{
                const {price,cartQuantity}=cartItem;
                const itemTotal = price*cartQuantity;

                cartTotal.total += itemTotal;
                cartTotal.quantity +=cartQuantity;
                return cartTotal
                 
            },{total:0,quantity:0})

            state.cartTotalAmount=total;
            state.cartTotalQuentity=quantity;
        }
    },

})

export { CartSlice }