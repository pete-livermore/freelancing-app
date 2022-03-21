import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import WebIcon from '@mui/icons-material/Web'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import PublicIcon from '@mui/icons-material/Public'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter';
import JobCard from '../jobs/JobCard'

export default function CompanyDetail() {
  const [companyData, setCompanyData] = useState({})

  const { id } = useParams()

  useEffect(() => {

    const getCompanyData = async () => {
      try {
        const { data } = await axios.get(`/api/companies/${id}/`)
        console.log(data)
        setCompanyData(data)
      } catch (err) {
        console.log(err)
      }
    }
    getCompanyData()
  }, [id])

  return (
    Object.keys(companyData).length &&
    <Container sx={{ mt: 6 }}>
      <Paper sx={{ p: 3, mt: 9, display: 'flex', minWidth: '300px' }}>
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
          <Box display='flex'>
            <PublicIcon sx={{ mr: 2 }} />
            <Typography>{companyData.country}</Typography>
          </Box>
          <Typography>{companyData.description}</Typography>
          <Stack direction='row' spacing={2}>
            <Link to={`${companyData.website}`}>
              <WebIcon sx={{ color: '#C2185B' }} />
            </Link>
            <FacebookIcon sx={{ color: '#C2185B' }} />
            <TwitterIcon sx={{ color: '#C2185B' }} />
          </Stack>
        </Box>
      </Paper>
      <Box mt={4} mb={4}>
        <Typography variant='h6'>Posted jobs:</Typography>
      </Box>
      {companyData.posted_jobs.length && companyData.posted_jobs.map(job => {
        return <JobCard widthMax={400} cardHeight='200px' key={job.id} job={job} image={false} />
      })}
    </Container>
  )
}