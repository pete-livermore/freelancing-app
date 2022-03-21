import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import CheckList from '../checklist/Checklist'
import JobCardMini from '../../jobs/JobCardMini'
import Calendar from '../planner/Calendar'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress'


export default function CurrentJobs({ profileData, setMilestoneUpdated, setJobCompleted, jobCompleted }) {
  const token = window.localStorage.getItem('outsourcd-token')
  const years = [2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030]
  const [year, setYear] = useState(years[years.indexOf(new Date().getFullYear())])
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const [month, setMonth] = useState(months[new Date().getMonth()])
  const [selectedJobData, setSelectedJobData] = useState({})
  const [checklistUpdated, setChecklistUpdated] = useState(false)
  const activeJobs = Object.keys(profileData).length ? profileData.jobs.filter(job => !job.complete) : []
  const [selectedJob, setSelectedJob] = useState(activeJobs.length ? { ...activeJobs[0] } : {})
  const handleChange = (e) => {
    const matchedJobs = profileData.jobs.filter(job => job.name === e.target.value)
    setSelectedJob(matchedJobs[0])
  }
  const [hoveredDate, setHoveredDate] = useState('')
  const [hasError, setHasError] = useState({ error: false, message: '' })

  useEffect(() => {
    if (Object.keys(selectedJob).length) {
      const getJob = async () => {
        try {
          const { data } = await axios.get(`/api/jobs/${selectedJob.id}/`)
          setSelectedJobData(data)
        } catch (err) {
          setHasError({ error: true, message: err.message })
        }
      }
      getJob()
    }
  }, [selectedJob, checklistUpdated])

  const calcProgress = () => {
    if (Object.keys(selectedJobData).length && selectedJobData.milestones.length) {
      const checkedMilestones = selectedJobData.milestones.filter(milestone => milestone.completed).map(milestone => milestone.name)
      return (checkedMilestones.length / selectedJobData.milestones.length) * 100
    }
  }
  calcProgress()

  const handleGenerateInvoice = (e) => {
    e.preventDefault()
    const dataToStore = { freelancerInfo: profileData, jobData: selectedJobData }
    localStorage.setItem('jobDetails', JSON.stringify(dataToStore))
    window.open('/invoicegenerator', '_blank')
  }

  const handleComplete = (e) => {
    e.preventDefault()
    const dataToSend = { complete: true }
    const updateJobStatus = async () => {
      try {
        await axios.put(`/api/jobs/${selectedJobData.id}/`, dataToSend,
          {
            'headers': {
              'Authorization': `Bearer ${token}`
            }
          }
        )
        if (!jobCompleted) setJobCompleted(true)
        else setJobCompleted(false)
        if (activeJobs.length > 1) setSelectedJob(activeJobs[activeJobs.indexOf(selectedJob) + 1])
        else {
          setSelectedJob({})
          setSelectedJobData({})
        }
      } catch (err) {
        setHasError({ error: true, message: err.message })
      }
    }
    updateJobStatus()
  }


  return (
    <Box display='flex' flexDirection='column'>
      <Box display='flex' justifyContent='space-between' flexDirection={{ sm: 'column', md: 'row' }}>
        {Object.keys(selectedJobData).length ?
          <>
            <JobCardMini job={selectedJobData} image={true} calcProgress={calcProgress} />
            <FormControl sx={{ mr: 6 }}>
              <Paper>
                <InputLabel id="job-select">Select job</InputLabel>
                <Select
                  labelId="job-select"
                  id="job-select"
                  value={selectedJobData.name}
                  label="job"
                  onChange={handleChange}
                >
                  {profileData.jobs.length && profileData.jobs.map(job => {
                    return <MenuItem key={job.id} value={job.name}>{job.name}</MenuItem>
                  })
                  }
                </Select>
              </Paper>
            </FormControl>
          </>
          :
          hasError.error ?
            <Typography>{hasError.message}</Typography>
            :
            ''
        }
      </Box>
      <Box display='flex' mt={6} justifyContent='space-between' flexDirection={{ md: 'column', lg: 'row' }}>
        <Paper sx={{ flexGrow: 1, p: '20px', mr: 6, minWidth: 400 }}>
          {Object.keys(selectedJob).length ?
            Object.keys(selectedJobData).length ?
              <>
                <Typography variant='h6'>Milestones</Typography>
                <CheckList
                  selectedJob={selectedJobData}
                  setSelectedJob={setSelectedJob}
                  setHoveredDate={setHoveredDate}
                  months={months}
                  setMonth={setMonth}
                  setMilestoneUpdated={setMilestoneUpdated}
                  setChecklistUpdated={setChecklistUpdated}
                  year={year}
                  setYear={setYear}
                />
                {calcProgress() === 100 &&
                  <Stack direction='row' spacing={4} sx={{ justifyContent: 'center', mt: 1 }}>
                    <Button
                      type='button'
                      variant='contained'
                      onClick={handleGenerateInvoice}
                    >
                      Generate invoice
                    </Button>
                    <Button
                      type='button'
                      variant='contained'
                      sx={{ backgroundColor: '#C2185B', '&:hover': { backgroundColor: '#ad1457' } }}
                      onClick={handleComplete}
                    >
                      Mark job as complete
                    </Button>
                  </Stack>}
              </>
              :
              hasError.error ?
                <Typography>{hasError.message}</Typography>
                :
                <Box width='100%' display='flex' justifyContent='center' pt={4}>
                  <CircularProgress />
                </Box>
            :
            <Box width='100%' display='flex' justifyContent='center' pt={4}>
              <Box display='flex' flexDirection='column'>
                <Typography variant='h6'>No jobs yet</Typography>
                <Button variant='contained' sx={{ mt: 4 }}><Link to='/find' style={{ textDecoration: 'none' }}><Typography color='white'>Find a job</Typography></Link></Button>
              </Box>
            </Box>
          }
        </Paper>
        <Paper sx={{ pt: 4, px: 4, ml: { xs: 0, sm: 0, md: 0, lg: 5 }, maxWidth: 420 }} >
          <Calendar months={months} month={month} setMonth={setMonth} hoveredDate={hoveredDate} years={years} setYear={setYear} year={year} />
        </Paper>
      </Box>
    </Box >
  )

}