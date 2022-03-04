import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const JobDetail = () => {
  const [jobData, setJobData] = useState({})

  const { id } = useParams()

  useEffect(() => {
    const getJob = async () => {
      try {
        const { data } = await axios.get(`/api/jobs/${id}`)
        setJobData(data)
      } catch (err) {
        console.log(err)
      }
    }
    getJob()
  }, [id])

  console.log(jobData)

  return (
    <Container>
      <Box display='flex' flexDirection='column' backgroundColor='white' mt={4} p={4} borderRadius={2}>
        <Typography>
          {jobData.name}
        </Typography>
        <Typography>{jobData.category}</Typography>
        <Typography>{jobData.brief}</Typography>
        <Typography>Listed date: {jobData.date_listed}</Typography>
        <Typography>Expected completion date: {jobData.completion_date}</Typography>
        <Typography>Salary for entire job: £{jobData.pay}</Typography>
      </Box>
    </Container >
  )
}

export default JobDetail