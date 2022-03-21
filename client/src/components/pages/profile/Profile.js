import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress'
import Container from '@mui/material/Container'
import CreateProfile from './createProfile/CreateProfile'
import { Typography } from '@mui/material'
import ResponsiveSideNav from './ResponsiveSideNav'


const Profile = ({ profileData, setProfileData }) => {
  const [formValues, setFormValues] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [skillsAdded, setSkillsAdded] = useState(false)
  const token = window.localStorage.getItem('outsourcd-token')
  const [textInput, setTextInput] = useState({ input: false, text: '' })
  const [imageUploaded, setImageUploaded] = useState(false)
  const [milestoneUpdated, setMilestoneUpdated] = useState(false)
  const [hasErrors, setHasErrors] = useState({ error: true, message: '' })
  const [jobCompleted, setJobCompleted] = useState(false)


  useEffect(() => {
    const getProfileData = async () => {
      try {
        const { data } = await axios.get('/api/profiles/profile/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setProfileData(data)
        setFormValues(data)
        localStorage.setItem('outsourcd-profile-image', JSON.stringify(data.profile_image))
      } catch (err) {
        setHasErrors({ error: true, message: err.message })
      }
    }
    getProfileData()
  }, [token, skillsAdded, textInput, isLoading, imageUploaded, milestoneUpdated, setProfileData, jobCompleted])


  return (
    <>
      {Object.keys(profileData).length ?
        (profileData.first_name ?
          <ResponsiveSideNav
            profileData={profileData}
            setImageUploaded={setImageUploaded}
            setProfileData={setProfileData}
            setMilestoneUpdated={setMilestoneUpdated}
            textInput={textInput}
            setTextInput={setTextInput}
            setSkillsAdded={setSkillsAdded}
            skillsAdded={skillsAdded}
            setJobCompleted={setJobCompleted}
            jobCompleted={jobCompleted}
          />
          :
          <>
            <Container sx={{ mt: 8, pt: 4 }}>
              <Typography variant='h4' align='center' sx={{ p: 4 }}>Welcome {profileData.username}! Let's get you started...</Typography>
              <CreateProfile formValues={formValues} setFormValues={setFormValues} setIsLoading={setIsLoading} />
            </Container>
          </>
        )
        :
        <CircularProgress />
      }
    </>
    // (
    //   <>
    //     {!isLoading ?
    //       <CreateProfile formValues={formValues} setFormValues={setFormValues} setIsLoading={setIsLoading} setProfileComplete={setProfileComplete} />
    //       :
    //       <Box display='flex' justifyContent='center' mt={4}>
    //         <CircularProgress />
    //       </Box>
    //     }
    //   </>
    // )
    //   }
    // </>
  )
}

export default Profile