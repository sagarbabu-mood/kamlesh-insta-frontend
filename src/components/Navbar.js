import React, {useContext} from 'react';
import logo from '../img/logo.png'
import '../css/Navbar.css'
import { Link } from 'react-router-dom';
import { LoginContext } from '../context/LoginContext';

export default function Navbar({userLogin}) {
  const {setModal} = useContext(LoginContext)

  const loginStatus = () => {
    const token = localStorage.getItem("token")
    if(userLogin || token){
      return [
      <>
        <Link to="/profile">
          <li>Profile</li>
        </Link>
        <Link to="/createPost">
          <li>Create Post</li>
        </Link>
        <Link to="followingpost">
          <li>My Following</li>
        </Link>
        <Link to={""}>
          <button className="primaryBtn" onClick={() => setModal(true)}>
            Log Out
          </button>
        </Link>
      </>]
  }else{
    return [
      <>
      <Link to="/signup">
          <li>SingUp</li>
        </Link>
        <Link to="/signin">
          <li>SignIn</li>
        </Link>
      </>]
  }
}
const loginStatusMobile = () => {
  const token = localStorage.getItem("token")
  if(userLogin || token){
    return [
    <>
      <Link to="/">
        <li><span class="material-symbols-outlined">
            home
            </span>
          </li>
      </Link>
      <Link to="/profile">
        <li><span class="material-symbols-outlined">
        account_circle
        </span></li>
      </Link>
      <Link to="/createPost">
        <li><span class="material-symbols-outlined">
        add_box
        </span></li>
      </Link>
      <Link to="followingpost">
        <li><span class="material-symbols-outlined">
        explore
        </span></li>
      </Link>
      <Link to={""}>
        <li  onClick={() => setModal(true)}>
        <span class="material-symbols-outlined">
        logout
        </span>
        </li>
      </Link>
    </>]
}else{
  return [
    <>
    <Link to="/signup">
        <li>SingUp</li>
      </Link>
      <Link to="/signin">
        <li>SignIn</li>
      </Link>
    </>]
}
}

  return (
    <div className='navbar'>
      <Link to="/">
      <img id='insta-logo' src={logo}  alt='logo' style={{height:"60px",width:"120px"}}/>
      </Link>
      <ul className='nav-menu'>
        {
          loginStatus()
        }
      </ul>
      <ul className='nav-mobile'>
        {
          loginStatusMobile()
        }
      </ul>
    </div>
  )
}
