import React, { useState, useEffect } from 'react'
import axios from 'axios'
import HorizontalStepper from './Stepper'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'

const CreateProfile = ({ formValues, setFormValues, setIsLoading }) => {
  const [skills, setSkills] = useState([])
  const [sectors, setSectors] = useState([])
  const steps = [{
    text: 'Personal details',
    fields: [
      { text: 'First name', type: 'text' },
      { text: 'Last name', type: 'text' },
      { text: 'Address', type: 'text' },
      { text: 'City', type: 'text' },
      { text: 'Country', type: 'text' },
      { text: 'Postcode', type: 'text' }
    ]
  },
  {
    text: 'Business information',
    fields: [{ text: 'Business name', type: 'text' }, { text: 'Business website', type: 'url' },]
  },
  {
    text: 'About your work',
    fields: [{ text: 'About you', type: 'text' }, { text: 'Job title', type: 'text' }, { text: 'Personal website', type: 'url' }, { text: 'LinkedIn profile', type: 'url' }]
  }]

  useEffect(() => {
    const getSkills = async () => {
      try {
        const { data } = await axios.get('api/skills/')
        setSkills(data)
      } catch (error) {
        console.log(error)
      }
    }
    getSkills()
  }, [])

  useEffect(() => {
    const getSectors = async () => {
      try {
        const { data } = await axios.get('api/sectors/')
        setSectors(data)
      } catch (error) {
        console.log(error)
      }
    }
    getSectors()
  }, [])


  const handleImageUrl = url => {
    setFormValues({ ...formValues, profile_image: url })
  }


  return (
    <Paper sx={{ mt: 2, p: '30px' }}>
      <Typography variant='h5' element='h1' sx={{ mb: '25px' }}>Create your freelancer profile</Typography>
      <HorizontalStepper
        steps={steps}
        skills={skills}
        handleImageUrl={handleImageUrl}
        setFormValues={setFormValues}
        formValues={formValues}
        setIsLoading={setIsLoading}
        sectors={sectors}
      />
    </Paper>
  )
}

export default CreateProfile