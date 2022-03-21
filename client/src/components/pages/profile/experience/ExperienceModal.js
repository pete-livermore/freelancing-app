import React, { useState, useEffect } from 'react'
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
import DateAdapter from '@mui/lab/AdapterDateFns'
import CircularProgress from '@mui/material/CircularProgress'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker'
import MobileDatePicker from '@mui/lab/MobileDatePicker'


export default function ExperienceModal({ experienceModalOpen, setExperienceModalOpen, profileData }) {
  const token = window.localStorage.getItem('outsourcd-token')
  const [companies, setCompanies] = useState([])
  const [formValues, setFormValues] = useState({
    company_name: 0,
    job_title: '',
    start_date: new Date(),
    end_date: new Date(),
    user: profileData.id
  })
  const [error, setError] = useState({ error: false, message: '' })


  useEffect(() => {
    const getCompanies = async () => {
      try {
        const { data } = await axios.get('/api/companies/')
        setCompanies(data)
      } catch (err) {
        setError({ error: true, message: err.message })
      }
    }
    getCompanies()
  }, [token])


  const handleClose = () => {
    setExperienceModalOpen(false)
  }

  const handleFormSubmit = (e) => {
    const addExperience = async () => {
      try {
        await axios.post(`/api/experiences/`, formValues,
          {
            'headers': {
              'Authorization': `Bearer ${token}`
            }
          }
        )
        handleClose()
      } catch (err) {
        setError({ error: true, message: err.message })
      }
    }
    addExperience()
  }


  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
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

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
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
                        onChange={handleInputChange}
                        name='company_name'
                      >
                        {companies.length && companies.map(company => (<MenuItem key={company.name} value={company.id}>{company.name}</MenuItem>))}
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', mt: 2 }}>
                  <Typography sx={{ width: '200px' }}>Start date</Typography>
                  <Box flexGrow={1}>
                    <DesktopDatePicker
                      label="Start date"
                      inputFormat="dd/MM/yyyy"
                      value={formValues.start_date}
                      onChange={handleStartDateChange}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Box>
                </Grid>
                <Grid item sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', mt: 2 }}>
                  <Typography sx={{ width: '200px' }}>End date</Typography>
                  <Box flexGrow={1}>
                    <DesktopDatePicker
                      label="End date"
                      inputFormat="dd/MM/yyyy"
                      value={formValues.end_date}
                      onChange={handleEndDateChange}
                      renderInput={(params) => <TextField {...params} />}
                    />
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
    </LocalizationProvider>
  )
}