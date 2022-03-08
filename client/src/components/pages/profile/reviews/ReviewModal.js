import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'


export default function ProfileImageModal({ profileData, iconClicked, setIconClicked }) {
  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    password: '',
    profile_image: ''
  })
  console.log(formValues)

  const handleClose = () => {
    setIconClicked(false)
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
      } catch (error) {
        console.log(error)
      }
    }
    postImage()
  }

  return (
    <div>
      <Modal
        open={iconClicked}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box display='flex' justifyContent='center' alignItems='center' height='100vh'>
          <form onSubmit={handleFormSubmit}>
            <Box backgroundColor='white' p={6} borderRadius={2} width='600px' boxShadow={24} maxHeight='100vh'>
              <Stack direction='row'>
                <Button type='submit' disabled={true}>Submit</Button>
                <Button onClick={handleClose}>Close</Button>
              </Stack>
            </Box>
          </form>
        </Box>
      </Modal>
    </div >
  )
}