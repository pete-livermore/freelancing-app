import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Container from '@mui/material/Container'
import CreateProfile from './CreateProfile'
import Dashboard from './Dashboard'


const Profile = () => {
  const [profileData, setProfileDate] = useState({})
  const [formValues, setFormValues] = useState({})
  const formData = profileData

  const token = window.localStorage.getItem('outsourcd-token')
  console.log(token)

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const { data } = await axios.get('api/profiles/profile/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setProfileDate(data)
      } catch (error) {
        console.log(error)
      }
    }
    getProfileData()
  }, [token])

  const handleChange = (e) => {
    console.log(e.target.name.replace(/\s+/g, '_').toLowerCase(), e.target.value)
    setFormValues({ ...formData, [e.target.name.replace(/\s+/g, '_').toLowerCase()]: e.target.value })
  }

  const handleImageUrl = url => {
    setFormValues({ ...formValues, profilePicture: url })
  }

  console.log(formValues)


  return (
    <>
      {!profileData.first_name ? <CreateProfile handleChange={handleChange} handleImageUrl={handleImageUrl} formValues={formValues} />
        :
        <Dashboard />
      }
    </>
  )
}

export default Profile