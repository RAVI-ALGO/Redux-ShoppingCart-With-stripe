import React, { useState } from 'react'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { loginUser } from "../../slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { StyledForm } from "./StyledForm";
import { loginUser } from '../../components/store/features/AuthSlice';
import { toast } from 'react-toastify';

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const auth = useSelector((state)=>state.auth)
    const [user, setUser] = useState({
        email: "",
        password: "",
      });
    
      const handleSubmit = () => {
        dispatch(loginUser(user)); 
      };
      useEffect(() => {
        if (auth._id) {
          navigate("/cart");
          toast.success('Logged in')
          
        }
      }, [auth._id, navigate]);
      
    return (
        <>
      <StyledForm>
        <h2>Login TO Account</h2>
        {auth.loginError?<p className=' text-danger'>{auth?.loginError?.errors}</p>:null}

        <input
          type="email"
          name='email'
          placeholder="email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type="password"
          name='password'
          placeholder="password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        
        <button type='button' onClick={()=>{handleSubmit()}}>
        {auth?.loginStatus === "pending" ? "Submitting..." : "Login"}
        </button>
        {/* {auth.loginStatus === "rejected" ? <p>{auth.loginError}</p> : null} */}
        <h4>Don't have account? <Link to='/signup' className=' text-decoration-none'>signup</Link></h4>
      </StyledForm>
    </>

    )
}
