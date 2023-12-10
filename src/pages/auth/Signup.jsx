
import React, { useState } from 'react'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthSlice, registerUser } from "../../components/store/features/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import { StyledForm } from "./StyledForm";
import { toast } from 'react-toastify';
export default function Signup() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const auth = useSelector((state)=>state.auth)

    const [user, setUser] = useState({
        name:"",
        email: "",
        password: "",
      });
      const handleSubmit = async(e) => {
        e.preventDefault();
        dispatch(registerUser(user));
         
      };
      useEffect(() => {
        if (auth._id) {
          navigate("/cart");
          toast.success('Logged in')

        }
      }, [auth._id, navigate]);
  return (

   
    
        <>
      <StyledForm onSubmit={handleSubmit}>
        <h2>Create New Account</h2>
        {auth.registerError?<p className=' text-danger'>{auth?.registerError?.errors}</p>:null}
        
        <input
          type="name"
          placeholder="name"
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          
        />
        
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          
        />
             
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          

        />
          


        <button>
        {auth?.registerStatus === "pending" ? "Submitting..." : "Signup"}
        </button>
        
        <h4>Already have an account? <Link to='/login' className=' text-decoration-none'>login</Link></h4>
      </StyledForm>
    </>

    )
}
