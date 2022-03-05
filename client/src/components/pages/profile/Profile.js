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
  const token = window.localStorage.getItem('outsourcd-token')

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
  }, [token])



  return (
    <>
      {profileData.first_name ?
        <Dashboard />
        :
        (
          <>
            {!isLoading ?
              <CreateProfile formValues={formValues} setFormValues={setFormValues} setIsLoading={setIsLoading} />
              :
              <Box display='flex' justifyContent='center' mt={4}>
                <CircularProgress />
              </Box>
            }
          </>
        )
      }
    </>
  )
}

export default Profile