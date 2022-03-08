import React, { useState } from 'react'
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


export default function CurrentJobs({ profileData }) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const [month, setMonth] = useState(months[new Date().getMonth()])
  const [selectedJob, setSelectedJob] = useState({ ...profileData.jobs[0] })
  const handleChange = (e) => {
    const matchedJobs = profileData.jobs.filter(job => job.name === e.target.value)
    setSelectedJob(matchedJobs[0].name)
  }
  const [hoveredDate, setHoveredDate] = useState('')

  // const handleHoveredDate = () => {
  //   const month = new Date(hoveredDate).getMonth()

  // }

  return (
    <Paper sx={{ backgroundColor: '#F8F8F8', px: '25px', py: '35px', flexGrow: 1, display: 'flex', justifyContent: 'space-between' }}>
      {/* #fce4ec */}
      <Box display='flex' flexDirection='column'>
        <Box display='flex' justifyContent='space-between'>
          <Typography variant='h6' component='h2' width='200px'>
            Current jobs
          </Typography>
          {profileData.jobs.length && profileData.jobs.map(job => {
            return <JobCardMini key={job.id} job={job} image={true} />
          })
          }
          <FormControl sx={{ width: '250px' }}>
            <InputLabel id="job-select">Select job</InputLabel>
            <Select
              labelId="job-select"
              id="job-select"
              value={selectedJob.name}
              label="job"
              onChange={handleChange}
            >
              {profileData.jobs.length && profileData.jobs.map(job => {
                return <MenuItem key={job.id} value={job.name}>{job.name}</MenuItem>
              })
              }
            </Select>
          </FormControl>
        </Box>
        <Box display='flex' mt={2} justifyContent='space-between'>
          <Paper sx={{ flexGrow: 1, p: '20px', mr: '10px' }}>
            <Typography>Milestones</Typography>
            <CheckList milestones={selectedJob.milestones} setHoveredDate={setHoveredDate} months={months} setMonth={setMonth} />
            <Button>Generate invoice</Button>
          </Paper>
          <Paper sx={{ pt: '15px', px: '15px' }}>
            <Calendar profileData={profileData} months={months} month={month} setMonth={setMonth} hoveredDate={hoveredDate} />
          </Paper>
        </Box>
      </Box>
    </Paper>

  )

}