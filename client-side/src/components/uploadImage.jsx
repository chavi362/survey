import React, {useState} from 'react'

const uploadImage = () => {
    const [file, setFile] = useState();

    const handleFile = (e) => {
        setFile(e.target.files[0]);
    }

    const handleUpload = () => {
        
    }
    
  return (
    <div className='container'>
      <input type='file' onChange={handleFile}/>
      <button onClick={handleUpload}>Upload Image</button>
    </div>
  )
}

export default uploadImage
