/*
import React,{usestate} from 'react'

const cloud = () => {
    const [image, setImage] = useState("")
    const SubmitImage = ()=>{
    const data = new FormData()  
    data.append("file",image)
    data.append("upload_preset","x0r1d81e")
    data.append("cloud_name","realtimechatapp")

    fetch("https://api.cloudinary.com/v1_1/realtimechatapp/image/upload"{
        method:"post",
        body:data
    })
    .then((res)=>res.json)
    .then((data)=>{
        console.log(data);
    }).catch((err)=>{
        console.log
    })

    }
    return (
   <>
    <div>
        <div>
            <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
            <button onClick={SubmitImage}>upload</button>
        </div>
    </div>
    </> 
  )
  
}

export default cloud

*/