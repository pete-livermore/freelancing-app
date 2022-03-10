import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import CircularProgress from '@mui/material/CircularProgress'


export default function ExperienceModal({ experienceModalOpen, setExperienceModalOpen }) {
  const token = window.localStorage.getItem('outsourcd-token')


  // useEffect(() => {
  //   const getProfileData = async () => {
  //     try {
  //       const { data } = await axios.get('/api/profiles/profile/', {
  //         headers: {
  //           Authorization: `Bearer ${token}`
  //         }
  //       })
  //       setProfileData(data)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   getProfileData()
  // }, [token])

  const handleClose = () => {
    setExperienceModalOpen(false)
  }

  const handleFormSubmit = (e) => {
    console.log(e.target.value)
    //   const dataToSend = {
    //     assigned_freelancer: [profileData.id]
    //   }
    //   console.log(dataToSend)
    //   const addJobToProfile = async () => {
    //     try {
    //       await axios.put(`/api/jobs/${id}/`, dataToSend,
    //         {
    //           'headers': {
    //             'Authorization': `Bearer ${token}`
    //           }
    //         }
    //       )
    //       handleClose()
    //     } catch (error) {
    //       console.log(error)
    //     }
    //   }
    //   addJobToProfile()
  }

  return (
    <Modal
      open={experienceModalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box display='flex' justifyContent='center' alignItems='center' height='100vh'>
        <form onSubmit={handleFormSubmit}>
          <Box backgroundColor='white' p={6} borderRadius={2} width='600px' boxShadow={24} maxHeight='100vh'>
            <Typography>Add a job to your work history</Typography>
            <Grid sx={{ display: 'flex', flexDirection: 'column' }}>
              <Grid item sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                <Typography>Job name</Typography>
                <TextField
                  id="job-name"
                  label="Job name"
                  value=''
                  width='150px'
                />
              </Grid>
              <Grid item sx={{ display: 'flex' }}>
                <TextField />
              </Grid>
              <Grid item sx={{ display: 'flex' }}>
                <TextField />
              </Grid>
              <Grid item sx={{ display: 'flex' }}>
                <TextField />
              </Grid>
            </Grid>
            <Stack direction='row' spacing={2} mt={3}>
              <Button variant='contained' type='submit'>Submit</Button>
              <Button variant='outlined' onClick={handleClose}>Close</Button>
            </Stack>
          </Box>
        </form>
      </Box>
    </Modal>
  )
}