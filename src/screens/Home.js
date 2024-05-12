import React,{useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {toast } from 'react-toastify'
import '../css/Home.css'

export default function Home() {
  var defultPic = 'https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?size=626&ext=jpg'
  const [data, setData] = useState([])
  const [comment, setComment] = useState("")
  const [show, setShow] = useState(false)
  const [item, setItem] = useState([])
  const navigate = useNavigate()

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
    
  useEffect(()=> {
    const jwt_token = localStorage.getItem("token")
    if(!jwt_token){
      navigate("./signup")
    }

    const fetchData = async () => {
      const token = localStorage.getItem("token")
      try{const res = await fetch("/allPosts",{
        method:"GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      const data = await res.json()
      setData(data)
    }catch(err){
      console.log(err)
    }
    }
    fetchData()
  
  },[])

  const likePost = async (id)=> {
    const response = await fetch("/like",{
      method:'PUT',
      headers:{
        'Content-Type':"application/json",
        Authorization: "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify({
        postId : id
      })
    })
    const result = await response.json()
    const newData = data.map((posts) => {
      if (posts._id == result._id){
        return result
      }else{
        return posts
      }
    })
    setData(newData)
  }

  const unlikePost = async (id)=> {
    const response = await fetch("/unlike",{
      method:'PUT',
      headers:{
        'Content-Type':"application/json",
        Authorization: "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify({
        postId : id
      })
    })
    const result = await response.json()
    const newData = data.map((posts) => {
      if (posts._id == result._id){
        return result
      }else{
        return posts
      }
    })
    setData(newData)
  }

  const makeComment = async (id,commented) => { 
    try{const response = await fetch("/comment",{
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token") 
      },
      body: JSON.stringify({
        text: commented,
        postId: id
      })
    })
    const result = await response.json()
    console.log(result)
    const newData = data.map((posts) => {
      if (posts._id == result._id){
        return result
      }else{
        return posts
      }
    })
    setData(newData)
    notifyB("Comment posted Successfully")
    setComment("")
  }catch(err) {
    console.log(err)
  }
  }

  return (
    <div className="home">
      {
        data.map((eachPost) => {
          console.log(eachPost)
          return (
            <div className="cardd">
            <div className="card-header">
              <div className="card-pic">
                <img src={eachPost.postedBy.Photo ? eachPost.postedBy.Photo : defultPic} alt="profile" />
              </div>
              <Link to={`/profile/${eachPost.postedBy._id}`}>
              <h5 className='name-link'>{eachPost.postedBy.name}</h5>
              </Link>
            </div>
            <div className="card-image">
              <img src={eachPost.photo} alt="photo" />
            </div>
            <div className="card-content">
              <div className="spanandlike">
                {
                  eachPost.likes.includes(JSON.parse(localStorage.getItem("user"))._id)? (
                    <span class="material-symbols-outlined material-symbols-outlined-red" onClick={() => {unlikePost(eachPost._id)}}>
                    favorite
                  </span>
                  ):(
                    <span class="material-symbols-outlined" onClick={() => {likePost(eachPost._id)}}>
                    favorite
                  </span>
                  )
                }
              <p>{eachPost.likes.length} Likes</p>
              </div>
            <p>{eachPost.body}</p>
            <p style={{fontWeight:"bolder", cursor:"pointer"}} onClick={() => {setShow(true) 
              setItem(eachPost)}}>View all comments</p>
            <div className="add-comment">
            <span class="material-symbols-outlined">
               mood
            </span>
            <input type="text" placeholder='Add a comment' value={comment} onChange={(e) => {setComment(e.target.value)}} />
            <button className="comment" onClick={()=> {makeComment(eachPost._id,comment)}}>post</button>
            </div>
            </div>
          </div>
          )
        })
      }
      {
        show && (
      <div className="showComment">
        <div className="container">
          <div className="postPic">
            <img src={item.photo} alt="" />
          </div>
          <div className="details">
          <div className="card-header" style={{borderBottom: "1px solid #00000029"}}>
              <div className="card-pic">
                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8MXwwfHx8MA%3D%3D" alt="profile" />
              </div>
              <h5>{item.postedBy.name}</h5>
            </div>
            <div className="comment-section" style={{borderBottom: "1px solid #00000029"}}>
              {
                item.comments.map((eachComment) => {
                  return (

              <p className="comm">
                <span className="commentor" style={{fontWeight:"bolder"}}>{eachComment.postedBy.name} </span>
                <span className="commentText">{eachComment.comment}</span>
                </p>
                  )
                })
              }
            </div>
            <div className="card-content">
              <p>{item.likes.length} likes</p>
              <p>{item.body}</p>
              <div className="add-comment">
            <span class="material-symbols-outlined">
               mood
            </span>
            <input type="text" placeholder='Add a comment' value={comment}  onChange={(e) => {setComment(e.target.value)}}/>
            <button className="comment" onClick={()=> {makeComment(item._id,comment)
              setShow(false)
            }} >post</button>
            </div>
            </div>
          </div>
        </div>
        <div className="close-comment" onClick={() => {setShow(false)}}>
        <span class="material-symbols-outlined material-symbols-outlined-comment ">
            close
          </span>
        </div>
      </div>
        )
      }
      </div>
  )
}
