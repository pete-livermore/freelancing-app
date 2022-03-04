import React, { useState, useEffect } from 'react'
import HorizontalStepper from './Stepper'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

const CreateProfile = ({ handleChange, handleImageUrl, formValues }) => {

  return (
    <Container sx={{ backgroundColor: 'white', borderRadius: '5px', mt: '35px', p: '30px' }}>
      <Typography variant='h5' element='h1' sx={{ mb: '25px' }}>Create your freelancer profile</Typography>
      <HorizontalStepper handleChange={handleChange} handleImageUrl={handleImageUrl} formValues={formValues} />
    </Container>
  )
}

export default CreateProfile