import axios from 'axios'
import Alert from '@mui/material/Alert'
import Typography from '@mui/material/Typography'

const uploadUrl = process.env.REACT_APP_CLOUDINARY_URL
const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET

export const ImageUpload = ({ handleImageUrl, value, setImageUploading, setImageUploaded }) => {

  const handleUpload = async event => {
    setImageUploading(true)
    const data = new FormData()
    data.append('file', event.target.files[0])
    data.append('upload_preset', uploadPreset)
    const res = await axios.post(uploadUrl, data)
    if (res.data) setImageUploading(false)
    handleImageUrl(res.data.url)
    setImageUploaded(true)
  }

  return (
    <>
      {value ?
        <>
          <label className='file' width='100%'><Typography>Change File:</Typography> </label>
          <input
            className='file'
            type='file'
            onChange={handleUpload} /></> :
        <>
          <input
            className='input-pic'
            type='file'
            onChange={handleUpload} /></>
      }
    </>
  )
}