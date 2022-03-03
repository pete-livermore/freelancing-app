import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Box from '@mui/material/Box'
import HorizontalStepper from './Stepper'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

const CreateProfile = () => {

  return (
    <Container sx={{ backgroundColor: 'white', borderRadius: '5px', mt: '25px', p: '20px' }}>
      <Typography variant='h5' element='h1' sx={{ mb: '25px' }}>Create your freelancer profile</Typography>
      <HorizontalStepper />
    </Container>
  )
}

export default CreateProfile