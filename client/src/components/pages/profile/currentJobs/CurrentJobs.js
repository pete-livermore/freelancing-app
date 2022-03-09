import React, { useEffect, useState } from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import CheckList from '../checklist/Checklist'
import JobCardMini from '../../jobs/JobCardMini'
import Calendar from '../planner/Calendar'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress'
import { useNavigate } from 'react-router-dom'


export default function CurrentJobs({ profileData, setMilestoneUpdated }) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const [month, setMonth] = useState(months[new Date().getMonth()])
  const [selectedJobData, setSelectedJobData] = useState({})
  const [checklistUpdated, setChecklistUpdated] = useState(false)
  const [selectedJob, setSelectedJob] = useState({ ...profileData.jobs[0] })
  const handleChange = (e) => {
    const matchedJobs = profileData.jobs.filter(job => job.name === e.target.value)
    setSelectedJob(matchedJobs[0])
  }
  const [hoveredDate, setHoveredDate] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const getJob = async () => {
      try {
        const { data } = await axios.get(`/api/jobs/${selectedJob.id}`)
        setSelectedJobData(data)
      } catch (err) {
        console.log(err)
      }
    }
    getJob()
  }, [selectedJob, checklistUpdated])

  const calcProgress = () => {
    if (Object.keys(selectedJobData).length && selectedJobData.milestones.length) {
      const checkedMilestones = selectedJobData.milestones.filter(milestone => milestone.completed).map(milestone => milestone.name)
      return (checkedMilestones.length / selectedJobData.milestones.length) * 100
    }
  }
  calcProgress()

  const handleButtonClick = (e) => {
    e.preventDefault()
    const dataToStore = { freelancerInfo: profileData, jobData: selectedJobData }
    localStorage.setItem('jobDetails', JSON.stringify(dataToStore))
    window.open('/invoicegenerator', '_blank')

  }
  return (
    <Paper sx={{ backgroundColor: '#F8F8F8', px: '25px', py: '35px', flexGrow: 1, display: 'flex', justifyContent: 'space-between', boxShadow: 3 }}>
      <Box display='flex' flexDirection='column'>
        <Box display='flex' justifyContent='space-between'>
          <Typography variant='h6' component='h2' width='200px'>
            Current jobs
          </Typography>
          {Object.keys(selectedJobData).length &&
            <>
              <JobCardMini job={selectedJobData} image={true} calcProgress={calcProgress} />
              <FormControl sx={{ width: '250px' }}>
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
              </FormControl>
            </>
          }
        </Box>
        <Box display='flex' mt={6} justifyContent='space-between'>
          <Paper sx={{ flexGrow: 1, p: '20px', mr: '10px' }}>
            <Typography>Milestones</Typography>
            {Object.keys(selectedJobData).length ?
              <CheckList
                selectedJob={selectedJobData}
                setSelectedJob={setSelectedJob}
                setHoveredDate={setHoveredDate}
                months={months}
                setMonth={setMonth}
                setMilestoneUpdated={setMilestoneUpdated}
                setChecklistUpdated={setChecklistUpdated}
              />
              :
              <CircularProgress />
            }
            {calcProgress() === 100 && <Button typ='button' onClick={handleButtonClick}>Generate invoice</Button>}
          </Paper>
          <Paper sx={{ pt: '15px', px: '15px', ml: '25px' }}>
            <Calendar profileData={profileData} months={months} month={month} setMonth={setMonth} hoveredDate={hoveredDate} />
          </Paper>
        </Box>
      </Box>
    </Paper>

  )

}