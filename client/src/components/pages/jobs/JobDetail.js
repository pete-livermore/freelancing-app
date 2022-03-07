import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'

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
      <Box display='flex'>
        <Box flexGrow={1} display='flex' flexDirection='column' backgroundColor='white' mt={4} p={4} borderRadius={2}>
          <Typography variant='h3'>
            {jobData.name}
          </Typography>
          <Typography>{jobData.category}</Typography>
          <Typography>{jobData.brief}</Typography>
          <Typography>Listed date: {jobData.date_listed}</Typography>
          <Typography>Expected completion date: {jobData.completion_date}</Typography>
          <Typography>Salary for entire job: £{jobData.pay}</Typography>
        </Box>
        <Box width='550px' pt='32px' ml={4}>
          {jobData.company &&
            <Card sx={{ width: '100%' }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {jobData.company.name}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {jobData.company.sector}
                </Typography>
                <CardMedia
                  component="img"
                  height="194"
                  src={jobData.company.logo}
                  alt={jobData.company.name}
                />
                <Typography gutterBottom variant="h6" component="div">
                  Company name
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="medium">See full company info</Button>
              </CardActions>
            </Card>
          }
        </Box>
      </Box>
    </Container >
  )
}

export default JobDetail