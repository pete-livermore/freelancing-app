import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import JobModal from './JobModal'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import TaskAltIcon from '@mui/icons-material/TaskAlt';

export default function JobDetail() {
  const [jobData, setJobData] = useState({})
  const [modalOpenState, setModalOpenState] = useState(false)
  const [error, setError] = useState({ error: false, message: '' })

  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const getJob = async () => {
      try {
        const { data } = await axios.get(`/api/jobs/${id}/`)
        setJobData(data)
      } catch (err) {
        setError({ error: true, message: err.message })
      }
    }
    getJob()
  }, [id])

  const handleJobApplication = () => {
    setModalOpenState(true)
  }

  const handleButtonClick = (data) => {
    navigate(`/companies/${data.id}`)
  }

  return (
    <Container maxWidth='xl' sx={{ mt: 8 }}>
      <Box display='flex' flexDirection={{ xs: 'column', md: 'row' }}>
        {Object.keys(jobData).length &&
          <>
            <Paper sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minHeight: '500px', justifyContent: 'space-between', mt: 4, p: 6, order: { xs: 2, md: 1 } }} >
              <Typography variant='h4'>
                {jobData.name}
              </Typography>
              <Typography>{jobData.category}</Typography>
              <Typography sx={{ mt: 4, fontsize: 14, fontWeight: 600 }}>Brief</Typography>
              <Typography>{jobData.brief}</Typography>
              <Typography sx={{ mt: 4, fontsize: 14, fontWeight: 600 }}>Important dates</Typography>
              <Typography>Listed date: {new Date(jobData.date_listed).toLocaleDateString()}</Typography>
              <Typography>Expected completion date: {new Date(jobData.completion_date).toLocaleDateString()}</Typography>
              <Typography sx={{ mt: 4, fontsize: 14, fontWeight: 600 }}>Pay</Typography>
              <Typography>Salary per hour: £{jobData.pay}</Typography>
              <Typography sx={{ mt: 4, fontsize: 14, fontWeight: 600 }}>Deliverables</Typography>
              <List dense={true}>
                {jobData.deliverables.map(deliverable => (
                  <ListItem key={deliverable.id}>
                    <ListItemIcon>
                      <TaskAltIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={deliverable.name}
                    />
                  </ListItem>
                )
                )}
              </List>
              {!jobData.assigned_freelancer.length && <Button variant='contained' onClick={handleJobApplication}>Apply for job</Button>}
              <JobModal modalOpenState={modalOpenState} setModalOpenState={setModalOpenState} jobData={jobData} />
            </Paper>
            <Box width='500px' pt='32px' ml={4} order={{ xs: 1, md: 2 }} >
              {jobData.company &&
                <Card sx={{ width: '300px', p: 2 }}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {jobData.company.name}
                    </Typography>
                    <CardMedia
                      component="img"
                      height="194"
                      src={jobData.company.logo}
                      alt={jobData.company.name}
                    />
                    <Typography gutterBottom variant="h6" component="div">
                      Sector: {jobData.company.sector[0].name}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button size="medium" variant='outlined' onClick={() => handleButtonClick(jobData.company)}>See full company info</Button>
                  </CardActions>
                </Card>
              }
            </Box>
          </>
        }
      </Box>
    </Container >
  )
}