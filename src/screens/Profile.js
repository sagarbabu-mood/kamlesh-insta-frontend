import React,{useState, useEffect} from 'react'
import PostDetails from '../components/PostDetails'
import ProfilePic from '../components/ProfilePic'
import '../css/Profile.css'

export default function Profile() {
  var defultPic = 'https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?size=626&ext=jpg'
  const [user, setUser] = useState("")
  const [userGallery, setGallery] = useState([])
  const [show, setShow] = useState(false)
  const [posts, setPosts] = useState([])
  const [changePic, setChangePic] = useState(false)

  const showDetails = () => {
    if(show){

      setShow(false)
    }else{
      setShow(true)
    }
  }

  const changeprofile = () => {
    if (changePic){
      setChangePic(false)
    }else{
      setChangePic(true)
    }
  }

  useEffect(()=> {
    const fetchData = async () => {
      try{const response = await fetch(`/user/${JSON.parse(localStorage.getItem("user"))._id}`,{
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      const responseData = await response.json()
      setUser(responseData.user)
      setGallery(responseData.userPost)
      } catch(err){
        console.log(err)
      }
    }

    fetchData()
  },[])
  return (
    <div className='profile'>
    <div className="profile-frame">
      <div className="profile-pic">
        <img onClick={changeprofile} src={user.Photo ? user.Photo : defultPic} alt="" />
      </div>
      <div className="profile-data">
        <h3>{user.name}</h3>
        <div className="profile-info" style={{display:"flex"}}>
              <p>{userGallery ? userGallery.length:"0"} post</p>
              <p>{user.followers ? user.followers.length:"0"} followers</p>
              <p>{user.following ? user.following.length: "0"} followings</p>
        </div>
        </div>
    </div>
    <hr style={{width:"90%",opacity:"0.8",margin:"25px auto"}}/>
    <div className="gallery">
      {
        userGallery.map((eachDetails)=> {
          return (
            <img src={eachDetails.photo} alt="gallery"
            onClick={()=> {setShow(true)
              setPosts(eachDetails)
            }} 
            key={eachDetails._id}/>
          )
        })
      }
    </div>
    {
      show && (
        <PostDetails item={posts} showDetails={showDetails}/>
      )
    }
    {
    changePic && (
        <ProfilePic changeprofile={changeprofile} />
    )
    }
    </div>
  )
}
