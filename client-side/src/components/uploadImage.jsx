import React, {useState} from 'react'
import { serverRequests } from "../Api";

const UploadImage = ({setQuestion}) => {
    const [file, setFile] = useState(null);

    const handleFile = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        handleUpload(selectedFile);
      }



    const handleUpload = (file) => {
        const formData = new FormData();
        formData.append('image', file);
        const question_id = '1';
        console.log(file);
        fetch(`http://localhost:3000/upload/${question_id}`, {
          method: 'PUT',
          body: formData,
          headers: {
            'Accept': 'multipart/form-data',
          }
        })
          .then(async response => {
            if (!response.ok) {
              if (response.status === 401) {
                console.log('Refreshing token and retrying...');
              }
              if (response.status === 403) {
                console.log('invalid token you cannot do it...');
              }
            }
            return await response.json();
          })
          .then(data => {
            console.log('File uploaded successfully', data);
            setQuestion(prevQuestion => ({
                ...prevQuestion,
                image_url: file.name
              }));
          })
          .catch(error => {
            setError('Error uploading file:', error)
          });
      };
    
  return (
    <div >
      
      {file ? (
            <img className='images' src={`http://localhost:3000/images/${file.name}`} alt={`image ${file.name}`} />
            ):(
<input type='file' onChange={handleFile}/>
            )}
    </div>
  )
}

export default UploadImage
