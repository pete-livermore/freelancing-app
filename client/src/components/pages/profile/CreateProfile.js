import React, { useState, useEffect } from 'react'
import axios from 'axios'
import HorizontalStepper from './Stepper'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

const CreateProfile = ({ formValues, setFormValues, setIsLoading }) => {
  const [skillsData, setSkillsData] = useState([])
  const newSkillsArr = []
  skillsData.forEach(obj => {
    newSkillsArr.push({ value: obj.id, label: obj.name })
  }
  )

  const steps = [{
    text: 'Personal details',
    fields: [{ text: 'First name', type: 'text' }, { text: 'Last name', type: 'text' }, { text: 'Address', type: 'text' }]
  },
  {
    text: 'Business information',
    fields: [{ text: 'Business name', type: 'text' }, { text: 'Business website', type: 'url' },]
  },
  {
    text: 'About your work',
    fields: [{ text: 'Sector', type: 'text' }, { text: 'About you', type: 'text' }]
  }]

  useEffect(() => {
    const getSkills = async () => {
      try {
        const { data } = await axios.get('api/profiles/skills/')
        setSkillsData(data)
      } catch (error) {

      }
    }
    getSkills()
  }, [])


  const handleImageUrl = url => {
    setFormValues({ ...formValues, profilePicture: url })
  }


  return (
    <Container sx={{ backgroundColor: 'white', borderRadius: '5px', mt: '35px', p: '30px' }}>
      <Typography variant='h5' element='h1' sx={{ mb: '25px' }}>Create your freelancer profile</Typography>
      <HorizontalStepper steps={steps} options={newSkillsArr} handleImageUrl={handleImageUrl} setFormValues={setFormValues} formValues={formValues} setIsLoading={setIsLoading} />
    </Container>
  )
}

export default CreateProfile