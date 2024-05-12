import React,{useState, useEffect, useRef} from 'react'

export default function ProfilePic({changeprofile}) {
  const hiddenFileInput = useRef(null)
  const [image, setImage] = useState("")
  const [url, setUrl] = useState("")

  const postDetails =async () => {
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset","insta-clone")
    data.append("cloud_name","kamleshcloud")
    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/kamleshcloud/image/upload",
      {
        method:'POST',
        body:data
      })
      const responseData = await response.json()
      setUrl(responseData.url)
    }catch(err) {
      console.log(err)
    }
  }

  const postPic = async () => {
    try{const res = await fetch("http://localhost:3005/uploadProfilePic",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer '  + localStorage.getItem("token")
      },
      body: JSON.stringify({
        pic:url
      })
    }
  )
  const resData = await res.json()
  changeprofile()
  window.location.reload()
    console.log(resData)
}catch(err){
    console.log(err)
}
  }

  const handleClick = () => {
    hiddenFileInput.current.click()
  }

  useEffect(()=> {
    if(image){
        postDetails()
    }
  },[image])

  useEffect(()=> {
    if(url){
        postPic()
    }
  },[url])

  return (
    <div className="profilePic darkBg">
      <div className="changePic centered">
        <div>
          <h2>Change Profile Photo</h2>
        </div>
        <div style={{ borderTop: "1px solid #00000030" }}>
          <button
            className="upload-btn"
            style={{ color: "#1EA1F7" }}
            onClick={handleClick}
          >
            Upload Photo
          </button>
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={hiddenFileInput}
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
        </div>
        <div style={{ borderTop: "1px solid #00000030" }}>
          <button onClick={()=> {setUrl(null) 
            postPic()
          }} className="upload-btn" style={{ color: "#ED4956" }}>
            {" "}
            Remove Current Photo
          </button>
        </div>
        <div style={{ borderTop: "1px solid #00000030" }}>
          <button
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "15px",
            }}
            onClick={changeprofile}
          >
            cancel
          </button>
        </div>
      </div>
    </div>
  )
}
