import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Container from '@mui/material/Container'
import JobCard from './JobCard'
import Filter from '../search/Filter'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'

const JobsList = () => {
  const [jobs, setJobs] = useState([])
  const [filteredJobs, setFilteredJobs] = useState([])
  const sectors = jobs.map(job => {
    return job.sector[0].name
  })

  useEffect(() => {
    const getAllJobs = async () => {
      try {
        const { data } = await axios.get('/api/jobs/')
        const availableJobs = data.filter(job => !job.assigned_freelancer.length)
        setJobs(availableJobs)
      } catch (err) {
        console.log(err)
      }
    }
    getAllJobs()
  }, [])

  // useEffect(() => {
  //   const getAllSectors = async () => {
  //     try {
  //       const { data } = await axios.get('/api/sectors/')
  //       setSectors(data)
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   }
  //   getAllSectors()
  // }, [])

  console.log(jobs)

  return (
    <Container>
      <Paper sx={{ p: '20px', mb: '60px' }}>
        <Filter options={sectors} dataToFilter={jobs} filteredData={filteredJobs} setFilteredData={setFilteredJobs} />
      </Paper>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} justifyContent='space-between' alignItems='center'>
        {(filteredJobs.length ? filteredJobs : jobs).map(job => {
          return <JobCard widthMax={{ xs: '400px', md: '500px' }} key={job.name} cardHeight='440px' job={job} image={true} />
        }
        )}
      </Stack>
    </Container>
  )
}

export default JobsList