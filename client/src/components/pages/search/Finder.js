import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Filter from './Filter'
import JobsList from '../jobs/JobsList'
import { userIsAuthenticated } from '../../../helpers/auth'
import SearchBox from './SearchBox'

const Finder = () => {

  const navigate = useNavigate()

  useEffect(() => {
    if (!userIsAuthenticated()) navigate('/auth')
  }, [navigate])

  return (
    <Container maxWidth='lg' sx={{ marginTop: '30px' }}>
      {userIsAuthenticated() &&
        <>
          <Box display='flex' justifyContent='space-between' backgroundColor='white' p={2} borderRadius={1} mb={4}>
            <Filter />
            <SearchBox label='Search for a specific job' />
          </Box>
          <JobsList />
        </>

      }
    </Container >

  )
}

export default Finder