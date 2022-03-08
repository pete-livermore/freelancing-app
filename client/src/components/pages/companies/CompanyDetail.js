import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import JobCard from '../jobs/JobCard'

export default function CompanyDetail() {
  const [companyData, setCompanyData] = useState({})

  const { id } = useParams()

  useEffect(() => {

    const getJob = async () => {
      try {
        const { data } = await axios.get(`/api/companies/${id}`)
        console.log(data)
        setCompanyData(data)
      } catch (err) {
        console.log(err)
      }
    }
    getJob()
  }, [id])

  return (
    Object.keys(companyData).length &&
    <Container sx={{ mt: '30px' }}>
      <Paper sx={{ p: '20px' }}>
        <Box display='flex'>
          <Box>
            <img
              component="img"
              height="194"
              src={companyData.logo}
              alt={companyData.name}
            />
          </Box>
          <Box pl={4}>
            <Typography gutterBottom variant="h3" component="h1">
              {companyData.name}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              Sector: {companyData.sector[0].name}
            </Typography>
            <Typography>{companyData.description}</Typography>
            <Typography>{companyData.website}</Typography>
            <Typography>{companyData.country}</Typography>
          </Box>
        </Box>
      </Paper>
      <Box mt={4} mb={4}>
        Posted jobs:
      </Box>
      {companyData.posted_jobs.length && companyData.posted_jobs.map(job => {
        return <JobCard key={job.id} job={job} image={false} />
      })}
    </Container>
  )
}