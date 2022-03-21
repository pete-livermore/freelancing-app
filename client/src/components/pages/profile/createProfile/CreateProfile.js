import React, { useState, useEffect } from 'react'
import axios from 'axios'
import HorizontalStepper from './Stepper'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'

const CreateProfile = ({ formValues, setFormValues, setIsLoading, steps }) => {
  const [skills, setSkills] = useState([])
  const [sectors, setSectors] = useState([])
  const [error, setError] = useState({ error: false, message: '' })


  useEffect(() => {
    const getSkills = async () => {
      try {
        const { data } = await axios.get('api/skills/')
        setSkills(data)
      } catch (err) {
        setError({ error: true, message: err.message })
      }
    }
    getSkills()
  }, [])

  useEffect(() => {
    const getSectors = async () => {
      try {
        const { data } = await axios.get('api/sectors/')
        setSectors(data)
      } catch (err) {
        setError({ error: true, message: err.message })
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