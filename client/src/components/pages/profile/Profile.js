import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import CreateProfile from './CreateProfile'
import Dashboard from './Dashboard'


const Profile = () => {
  const [profileData, setProfileData] = useState({})
  const [formValues, setFormValues] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [skillsAdded, setSkillsAdded] = useState(false)
  const token = window.localStorage.getItem('outsourcd-token')
  const [textInput, setTextInput] = useState({ input: false, text: '' })
  const [imageUploaded, setImageUploaded] = useState(false)
  const [milestoneUpdated, setMilestoneUpdated] = useState(false)

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const { data } = await axios.get('api/profiles/profile/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setProfileData(data)
        setFormValues(data)
      } catch (error) {
        console.log(error)
      }
    }
    getProfileData()
  }, [token, skillsAdded, textInput, isLoading, imageUploaded, milestoneUpdated])


  return (
    <>
      {Object.keys(profileData).length ?
        (profileData.first_name ?
          <Dashboard
            profileData={profileData}
            setProfileData={setProfileData}
            skillsAdded={skillsAdded}
            setSkillsAdded={setSkillsAdded}
            textInput={textInput}
            setTextInput={setTextInput}
            setImageUploaded={setImageUploaded}
            setMilestoneUpdated={setMilestoneUpdated}
          />
          :
          <CreateProfile formValues={formValues} setFormValues={setFormValues} setIsLoading={setIsLoading} />
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