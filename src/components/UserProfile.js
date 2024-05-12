import React,{useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import '../css/Profile.css'

export default function UserProfile() {
  var defultPic = 'https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?size=626&ext=jpg'
  const {userid} = useParams()
  const [user, setUser] = useState("")
  const [isFollow, setIsFollow] = useState(false)
  const [posts, setPosts] = useState([])
  
  useEffect(()=> {
    const fetchData = async () => {
      try{
        const response = await fetch(`/user/${userid}`,{
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
        })
        const responseData = await response.json()
        setUser(responseData.user)
        setPosts(responseData.userPost)
        if (
          responseData.user.followers.includes(
            JSON.parse(localStorage.getItem("user"))._id
          )
        ) {
          setIsFollow(true);
        }
      } catch(err){
        console.log(err)
      }
    }
    fetchData()
  },[isFollow])

  const followUser = async userId => {
    const response = await fetch("/follow",{
      method: 'PUT',
      headers: {
        'Content-Type':'application/json',
        Authorization: 'Bearer ' + localStorage.getItem("token")
      },
      body: JSON.stringify({
        followId:userId
      })
    })
    const data = await response.json()
    setIsFollow(true)
    console.log(data)
  }

  const unfollowUser = async userId => {
    const response = await fetch("/unfollow",{
      method: 'PUT',
      headers: {
        'Content-Type':'application/json',
        Authorization: 'Bearer ' + localStorage.getItem("token")
      },
      body: JSON.stringify({
        followId:userId
      })
    })
    const data = await response.json()
    setIsFollow(false)
    console.log(data)
  }

  return (
    <div className='profile'>
    <div className="profile-frame">
      <div className="profile-pic">
        <img src={user.Photo ? user.Photo : defultPic} alt="" />
      </div>
      <div className="profile-data">
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <h3>{user.name}</h3>
          <button className="followBtn"
           onClick={() => {
            if(isFollow){
              unfollowUser(user._id)
            }else{
              followUser(user._id)
            }
          }}
          >
            {isFollow ? "Unfollow" : "Follow"}
          </button>
        </div>
        <div className="profile-info" style={{display:"flex"}}>
              <p>{posts.length} post</p>
              <p>{user.followers ? user.followers.length : "0"} Followers</p>
              <p>{user.following ? user.following.length : "0"} Following</p>
        </div>
        </div>
    </div>
    <hr style={{width:"90%",opacity:"0.8",margin:"25px auto"}}/>
    <div className="gallery">
      {
        posts.map((eachDetails)=> {
          return (
            <img src={eachDetails.photo} alt="gallery"
            key={eachDetails._id}/>
          )
        })
      }
    </div>
    {/* {
      show && (
        <PostDetails item={posts} showDetails={showDetails}/>
      )
    } */}
    </div>
  )
}
