import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Container from '@mui/material/Container'
import JobCard from './JobCard'

const JobsList = () => {
  const [jobsData, setJobsData] = useState([])

  useEffect(() => {
    const getAllJobs = async () => {
      try {
        const { data } = await axios.get('/api/jobs/')
        setJobsData(data)
      } catch (err) {
        console.log(err)
      }
    }
    getAllJobs()
  }, [])

  console.log(jobsData)

  return (
    <Container>
      {jobsData.length && jobsData.map(job => {
        return <JobCard job={job} />
      }
      )}
    </Container>
  )
}

export default JobsList