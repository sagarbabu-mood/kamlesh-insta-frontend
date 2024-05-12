import React from 'react'
import { useState, useContext} from 'react'
import '../css/SignIn.css'
import { Link, useNavigate } from 'react-router-dom'
import {toast } from 'react-toastify'
import {LoginContext} from '../context/LoginContext'

export default function SignIn() {
  const {setUserLogin} = useContext(LoginContext)
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

    //Toast functions
    const notifyA = msg => toast.error(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
    
    const notifyB = msg => toast.success(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  async function  logInFunc() {
  
    if (!emailRegex.test(email)) {
      return notifyA("Invalid Email")
    }

    const Url = "/signin"
    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email:email,
        password:password
      })
    }
    const response = await fetch(Url,options)
    const data = await response.json()
    if(data.error){
      notifyA(data.error)
    }else{
      notifyB(data.message)
      localStorage.setItem("token", data.token)
      localStorage.setItem("user",JSON.stringify(data.user))
      setUserLogin(true)
      navigate("/")
    }
  }

  return (
    <div className='signIn'>
      <div>
      <div className='loginForm'>
      <h1 style={{fontFamily:"Lobster",fontSize:"40px"}}>Instagram</h1>
      <div>
        <input type='text' name='email' id='email' placeholder='Email' value={email} onChange={(e) => {setEmail(e.target.value)}}/>
      </div>
      <div>
        <input type='password' name='password' id='password' placeholder='Password' value={password} onChange={(e) => {setPassword(e.target.value)}}/>
      </div>
      <input type='submit' id='login-btn' value="Sign In" onClick={() => {logInFunc()}}/>
      </div>
      <div className='loginForm2'>
        <p>don't have an account ? <Link to="/signup"><span style={{color:"blue",cursor:"pointer"}}>Sign Up</span></Link></p>
      </div>
      </div>
    </div>
  )
}
