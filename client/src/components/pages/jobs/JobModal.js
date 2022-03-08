import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'


export default function JobModal({ jobData, modalOpenState, setModalOpenState }) {
  const token = window.localStorage.getItem('outsourcd-token')
  const { id } = useParams()
  console.log(id)
  const [profileData, setProfileData] = useState({})

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const { data } = await axios.get('/api/profiles/profile/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setProfileData(data)
      } catch (error) {
        console.log(error)
      }
    }
    getProfileData()
  }, [token])

  const handleClose = () => {
    setModalOpenState(false)
  }

  const handleSubmit = () => {
    const dataToSend = {
      assigned_freelancer: [profileData.id]
    }
    console.log(dataToSend)
    const addJobToProfile = async () => {
      try {
        await axios.put(`/api/jobs/${id}/`, dataToSend,
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
    addJobToProfile()
  }

  return (
    <div>
      <Modal
        open={modalOpenState}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box display='flex' justifyContent='center' alignItems='center' height='100vh'>
          <Box backgroundColor='white' p={6} borderRadius={2} width='600px' boxShadow={24} maxHeight='100vh'>
            Are you sure you want to apply for this job?
            <Stack direction='row'>
              <Button onClick={handleSubmit}>Submit</Button>
              <Button onClick={handleClose}>Close</Button>
            </Stack>
          </Box>
        </Box>
      </Modal>
    </div >
  )
}