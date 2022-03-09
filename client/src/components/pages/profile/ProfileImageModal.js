import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'
import { ImageUpload } from '../../../helpers/imageUpload'


export default function ProfileImageModal({ profileData, avatarClicked, setAvatarClicked, setImageUploaded }) {
  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    password: '',
    profile_image: ''
  })

  const handleImageUrl = url => {
    setFormValues({ username: profileData.username, email: profileData.email, password: profileData.password, profile_image: url })
  }


  const handleClose = () => {
    setAvatarClicked(false)
  }
  const [imageUploading, setImageUploading] = useState(false)

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const postImage = async () => {
      try {
        const token = localStorage.getItem('outsourcd-token')
        await axios.put('/api/profiles/profile/', formValues,
          {
            'headers': {
              'Authorization': `Bearer ${token}`
            }
          }
        )
        handleClose()
        setImageUploaded(true)
        setImageUploaded(false)
      } catch (error) {
        console.log(error)
      }
    }
    postImage()
  }

  return (
    <div>
      <Modal
        open={avatarClicked}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box display='flex' justifyContent='center' alignItems='center' height='100vh'>
          <form onSubmit={handleFormSubmit}>
            <Box backgroundColor='white' p={6} borderRadius={2} width='600px' boxShadow={24} maxHeight='100vh'>
              {!imageUploading ?
                <ImageUpload handleImageUrl={handleImageUrl} value={formValues.profile_image} setImageUploading={setImageUploading} />
                :
                <CircularProgress />
              }
              <Stack direction='row' spacing={2} mt={2}>
                <Button variant='contained' type='submit' disabled={imageUploading}>Submit</Button>
                <Button variant='outlined' onClick={handleClose}>Close</Button>
              </Stack>
            </Box>
          </form>
        </Box>
      </Modal>
    </div >
  )
}