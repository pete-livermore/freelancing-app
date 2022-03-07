import axios from 'axios'

const uploadUrl = process.env.REACT_APP_CLOUDINARY_URL
const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET

export const ImageUpload = ({ handleImageUrl, value, setImageUploading }) => {

  const handleUpload = async event => {
    setImageUploading(true)
    const data = new FormData()
    data.append('file', event.target.files[0])
    data.append('upload_preset', uploadPreset)
    const res = await axios.post(uploadUrl, data)
    if (res.data) setImageUploading(false)
    handleImageUrl(res.data.url)
    console.log(res.data.url)
  }

  return (
    <>
      {value ?
        <><div>
          <img id='add-profile-photo' src={value} alt='pp' height='200px' />
        </div>
          <label width='100%'>Change File: </label>
          <input
            className='input-pic'
            type='file'
            onChange={handleUpload} /></> :
        <><input
          className='input-pic'
          type='file'
          onChange={handleUpload} /></>
      }
    </>
  )
}