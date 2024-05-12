import React,{useContext} from 'react'
import { IoMdClose } from "react-icons/io";
import '../css/Modal.css'
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../context/LoginContext';

export default function Modal() {
  const navigate = useNavigate()
  const {setModal, setUserLogin} = useContext(LoginContext)
  return (
    <div className="darkBg" onClick={() => setModal(false)}>
    <div className="centered">
    <div className='modal'>
      <div className="modalheader">
        <h5 className="heading">Confirm</h5>
      </div>
        <button className="closeBtn" onClick={() => setModal(false)}>
        <IoMdClose />
        </button>
        <div className="modalContent">
            Are you really want to Logout?
        </div>
        <div className="modalActions">
            <div className="actionContainer">
                <button className="logOutBtn" onClick={() => {
                  setModal(false)
                  localStorage.removeItem("token")
                  setUserLogin(false)
                  navigate("./signin")}}>Logout</button>
                <button className="cancelBtn" onClick={() => setModal(false)}>Cancel</button>
            </div>
        </div>
    </div>
    </div>
    </div>
  )
}
