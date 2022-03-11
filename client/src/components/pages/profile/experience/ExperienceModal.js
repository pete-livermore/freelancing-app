import React, { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import CircularProgress from '@mui/material/CircularProgress'
import 'react-datepicker/dist/react-datepicker.css'


export default function ExperienceModal({ experienceModalOpen, setExperienceModalOpen, profileData }) {
  const token = window.localStorage.getItem('outsourcd-token')
  const [companies, setCompanies] = useState([])
  const [formValues, setFormValues] = useState({
    company_name: {
      country: '',
      description: '',
      id: 0,
      logo: '',
      name: '',
      posted_jobs: [],
      sector: [],
      website: ''
    },
    username: profileData.username,
    email: profileData.email,
    password: profileData.password,
    job_title: '',
    start_date: '',
    end_date: ''
  })
  const [startDate, setStartDate] = useState(new Date())

  useEffect(() => {
    const getCompanies = async () => {
      try {
        const { data } = await axios.get('/api/companies/')
        setCompanies(data)
      } catch (error) {
        console.log(error)
      }
    }
    getCompanies()
  }, [token])


  const handleClose = () => {
    setExperienceModalOpen(false)
  }

  const handleFormSubmit = (e) => {
    const experience = async () => {
      try {
        await axios.put(`/api/profiles/profile/`, formValues,
          {
            'headers': {
              'Authorization': `Bearer ${token}`
            }
          }
        )
        handleClose()
      } catch (error) {
        console.log(error)
      }
    }
    addJobToProfile()
  }

  const addJobToProfile = async () => {
    try {
      await axios.put(`/api/profiles/profile/`, formValues,
        {
          'headers': {
            'Authorization': `Bearer ${token}`
          }
        }
      )
      handleClose()
    } catch (error) {
      console.log(error)
    }
  }
  addJobToProfile()


  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }
  const handleCompanyChange = (e) => {
    const filtered = companies.filter(company => company.name === e.target.value)
    if (filtered.length) setFormValues({ ...formValues, company: filtered[0] })
  }

  const handleStartDateChange = (date) => {
    const year = date.getFullYear()
    const month = ("0" + (date.getMonth() + 1)).slice(-2)
    const day = ("0" + date.getDate()).slice(-2)
    const formattedDate = `${year}-${month}-${day}`
    setFormValues({ ...formValues, start_date: formattedDate })
  }

  const handleEndDateChange = (date) => {
    const year = date.getFullYear()
    const month = ("0" + (date.getMonth() + 1)).slice(-2)
    const day = ("0" + date.getDate()).slice(-2)
    const formattedDate = `${year}-${month}-${day}`
    setFormValues({ ...formValues, end_date: formattedDate })
  }
  console.log(formValues)

  return (
    <Modal
      open={experienceModalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box display='flex' justifyContent='center' alignItems='center' height='100vh'>
        <form onSubmit={handleFormSubmit}>
          <Box backgroundColor='white' p={6} borderRadius={2} width='600px' boxShadow={24} maxHeight='100vh'>
            <Typography variant='h6'>Add a job to your work history</Typography>
            <Grid sx={{ display: 'flex', flexDirection: 'column', mt: 3 }}>
              <Grid item sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', mt: 1 }}>
                <Typography sx={{ width: '200px' }}>Job title</Typography>
                <Box flexGrow={1}>
                  <TextField
                    id="job_title"
                    label="Job title"
                    name="job_title"
                    value={formValues.job_title}
                    sx={{ width: '100%' }}
                    onChange={handleInputChange}
                  />
                </Box>
              </Grid>
              <Grid item sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', mt: 1 }}>
                <Typography sx={{ width: '200px' }}>Company</Typography>
                <Box flexGrow={1}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Company</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id={"company-select"}
                      value={formValues.company_name.name}
                      label="Company"
                      onChange={handleCompanyChange}
                    >
                      {companies.length && companies.map(company => (<MenuItem key={company.name} value={company.name}>{company.name}</MenuItem>))}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', mt: 1 }}>
                <Typography sx={{ width: '200px' }}>Start date</Typography>
                <Box flexGrow={1}>
                  <DatePicker selected={startDate} onChange={(date) => handleStartDateChange(date)} />
                </Box>
              </Grid>
              <Grid item sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', mt: 1 }}>
                <Typography sx={{ width: '200px' }}>End date</Typography>
                <Box flexGrow={1}>
                  <DatePicker selected={startDate} onChange={(date) => handleEndDateChange(date)} />
                </Box>
              </Grid>
            </Grid>
            <Stack direction='row' spacing={2} mt={3}>
              <Button variant='contained' type='submit'>Submit</Button>
              <Button variant='outlined' onClick={handleClose}>Close</Button>
            </Stack>
          </Box>
        </form>
      </Box>
    </Modal>
  )
}