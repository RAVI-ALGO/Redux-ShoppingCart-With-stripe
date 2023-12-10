import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthSlice } from "./store/features/AuthSlice";
import { toast } from "react-toastify";
const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cart = useSelector((state)=>state.cart)
  const auth = useSelector((state)=>state.auth)

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary text-white">
        <div className="container-fluid">
          <a className="navbar-brand text-white" href="/">
            Zap-Bazar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse flex justify-content-between" id="navbarSupportedContent">
            <ul className="navbar-nav mx-md-4">
              <li className="nav-item active ">
                <NavLink className="nav-link px-3 text-white " to="/">
                  Home
                </NavLink>
              </li>
              
              
            </ul>
            <ul className="navbar-nav mx-md-4">
            <li className="nav-item active ">
                <NavLink className="nav-link px-3 text-white" to="/cart">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
              </svg>
              <span className="badge bg-success" style={{position:'relative',top:"-4px"}}>{cart.cartTotalQuentity}</span>
                </NavLink>
              </li>
              {
                (localStorage.getItem('login')==1)?
                <>
              <li className="nav-item active ">
                <NavLink className="nav-link px-3 text-white " onClick={()=>
                {dispatch(AuthSlice.actions.logoutUser())
                  toast.warning('Logged out')
                }}>
                  Logout
                </NavLink>
              </li>
              {/* <li className="nav-item active ">
                <NavLink className="nav-link px-3 text-white" to="/signup">
                Signup
                </NavLink>
              </li> */}
              </>
              :
              <>
               <li className="nav-item active ">
                <NavLink className="nav-link px-3 text-white " to="/login">
                  Login
                </NavLink>
              </li>
              <li className="nav-item active ">
                <NavLink className="nav-link px-3 text-white" to="/signup">
                Signup
                </NavLink>
              </li>
               </>
             
              }
              
            </ul>
          </div>
          
        </div>
      </nav>
    </>
  );
};

export default Navbar;
