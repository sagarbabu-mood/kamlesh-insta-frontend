import React ,{ useState} from 'react'
import '../css/SignUp.css'
import { Link, useNavigate } from 'react-router-dom'
import {toast } from 'react-toastify'

export default function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [userName, setUserName] = useState("")
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
  const passwordRegex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

  const postData =async () => {
    if (!emailRegex.test(email)) {
      return notifyA("Invalid Email")
    }else if (!passwordRegex.test(password)){
      return notifyA("Password must contain atleast 8 characters, including atleast 1 number and 1 includes both lower and uppercase letters and special characters for example #,?,! ")
    }
    const Url = "/signup";
    const options = {
      method:'POST',
      headers: {
        "Content-Type":"application/json",
      },
        body: JSON.stringify({
          name:name,
          email:email,
          username: userName,
          password: password
        })
    }
    const response = await fetch(Url,options)
    const data = await response.json()
    if(data.error) {
      notifyA(data.error)
    }else{
      notifyB(data.message)
      navigate('/signin')
    }
  }

  return (
    <div className='signUp'>
      <div className='form-container'>
        <div className='form'>
        <h1 style={{fontFamily:"Lobster",fontSize:"40px"}}>Instagram</h1>
        <p className='loginPara'>
            Sign up to see photos and videos <br/>from your friends
        </p>
        <div>
            <input type='email' name='email' id='email' placeholder='Email' value={email} onChange={(e) => {setEmail(e.target.value)}}/>
        </div>
        <div>
            <input type='text' name='name' id='namr' placeholder='Full Name' value={name} onChange={(e) => {setName(e.target.value)}}/>
        </div>
        <div>
            <input type='text' name='username' id='username' placeholder='Username' value={userName} onChange={(e) => {setUserName(e.target.value)}}/>
        </div>
        <div>
            <input type='password' name='password' id='password' placeholder='Password' value={password} onChange={(e) => {setPassword(e.target.value)}}/>
        </div>
        <p className='loginPara' style={{fontSize:"12px",margin:"3px 0px"}}>by signing up, you agree to out Terms, ,<br/>privacy policy and cookies policy. </p>
        <input type='submit' id='submit-btn' value="Sign Up"  onClick={() => { postData()}}/>
      </div>
      <div className='form2'>
        <p>Already have an account ? <Link to='/signin'>
                 <span style={{color:"blue",cursor:"pointer"}}>Sign In</span>
            </Link>
        </p>
      </div>
      </div>
    </div>
  )
}
