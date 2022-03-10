import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '@mui/material/Container'
import JobsList from '../jobs/JobsList'
import { userIsAuthenticated } from '../../../helpers/auth'

const Finder = () => {

  const navigate = useNavigate()

  useEffect(() => {
    if (!userIsAuthenticated()) navigate('/auth')
  }, [navigate])

  return (
    <Container maxWidth='lg' sx={{ mt: 8 }}>
      {userIsAuthenticated() &&
        <>
          <JobsList />
        </>
      }
    </Container >

  )
}

export default Finder