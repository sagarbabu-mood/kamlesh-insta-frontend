import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import '../css/PostDetails.css'

export default function PostDetails({ item, showDetails }) {
  const navigate = useNavigate()

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

  const deletePostFunc = async postId => {
    if (window.confirm("Are you really want to delete this post ?")) {
      try {
        const response = await fetch(`/deletePost/${postId}`, {
          method: 'DELETE',
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        const responseD = await response.json()
        notifyB(responseD.message)
        showDetails()
        navigate("/")
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <div className="showComment">
      <div className="container">
        <div className="postPic">
          <img src={item.photo} alt="" />
        </div>
        <div className="details">
          <div className="card-header" style={{ borderBottom: "1px solid #00000029" }}>
            <div className="card-pic">
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8MXwwfHx8MA%3D%3D" alt="profile" />
            </div>
            <h5>{item.postedBy.name}</h5>
            <div className="deletePost" onClick={() => { deletePostFunc(item._id) }}>
              <span className="material-symbols-outlined">
                delete
              </span>
            </div>
          </div>
          <div className="comment-section" style={{ borderBottom: "1px solid #00000029" }}>
            {
              item.comments.map((eachComment, index) => {
                return (
                  <p className="comm" key={index}>
                    <span className="commentor" style={{ fontWeight: "bolder" }}>{eachComment.postedBy.name} </span>
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
              <span className="material-symbols-outlined">
                mood
              </span>
              <input type="text" placeholder='Add a comment' />
              <button className="comment">post</button>
            </div>
          </div>
        </div>
      </div>
      <div className="close-comment" onClick={() => showDetails()}>
        <span className="material-symbols-outlined material-symbols-outlined-comment">
          close
        </span>
      </div>
    </div>
  )
}
