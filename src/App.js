import {Route,Routes,BrowserRouter} from 'react-router-dom'
import React,{createContext, useState} from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './screens/Home';
import Profile from './screens/Profile';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreatePost from './screens/CreatePost';
import {LoginContext} from './context/LoginContext'
import Modal from './components/Modal';
import UserProfile from './components/UserProfile';
import MyFollowingPost from './screens/MyFollowingPost';

function App() {
  const [userLogin, setUserLogin] = useState(false)
  const [isModal, setModal] = useState(false)
  return (
    <BrowserRouter>
      <div className="App">
        <LoginContext.Provider value={{setUserLogin, setModal}}> 
          <Navbar userLogin={userLogin} />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/signin' element={<SignIn />} />
            <Route exact path='/profile' element={<Profile />} />
            <Route path='/createPost' element={<CreatePost />} />
            <Route path='/profile/:userid' element={<UserProfile />} />
            <Route path='/followingpost' element={<MyFollowingPost />} />
          </Routes>
          <ToastContainer />
          { isModal && <Modal></Modal> }
        </LoginContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
