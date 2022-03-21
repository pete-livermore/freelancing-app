import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Stack from '@mui/material/Stack'
import Rating from '@mui/material/Rating'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import CircularProgress from '@mui/material/CircularProgress'


export default function ProfileImageModal({ profileData, iconClicked, setIconClicked }) {
  const [formValues, setFormValues] = useState({ rating: 0 })
  const token = localStorage.getItem('outsourcd-token')
  const handleClose = () => {
    setIconClicked(false)
  }
  const [error, setError] = useState({ error: false, message: '' })

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const postImage = async () => {
      try {
        await axios.put('/api/profiles/profile/', formValues,
          {
            'headers': {
              'Authorization': `Bearer ${token}`
            }
          }
        )
        handleClose()
      } catch (err) {
        setError({ error: true, message: err.message })
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
              <TextField
                sx={{ width: '100%' }}
                placeholder='Write your review...'
              />
              <Typography component="legend" sx={{ mt: 3 }}>Add a rating</Typography>
              <Rating
                name="user-rating"
                value={formValues.rating}
                onChange={(event, newValue) => {
                  setFormValues({ ...Box, rating: newValue })
                }}
              />
              <Stack direction='row' sx={{ mt: 2 }} spacing={2}>
                <Button type='submit' variant='contained' onClick={handleFormSubmit} disabled={true}>Submit</Button>
                <Button variant='contained' onClick={handleClose}>Close</Button>
              </Stack>
            </Box>
          </form>
        </Box>
      </Modal>
    </div >
  )
}