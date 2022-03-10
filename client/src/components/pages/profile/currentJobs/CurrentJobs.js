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


export default function CurrentJobs({ profileData, setMilestoneUpdated }) {
  const years = [2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030]
  const [year, setYear] = useState(years[years.indexOf(new Date().getFullYear())])
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
    <Box display='flex' flexDirection='column'>
      <Box display='flex' justifyContent='space-between'>
        <Typography variant='h5' component='h2' width='200px'>
          Current jobs
        </Typography>
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
          ''
        }
      </Box>
      <Box display='flex' mt={6} justifyContent='space-between'>
        <Paper sx={{ flexGrow: 1, p: '20px', mr: 6 }}>
          {Object.keys(selectedJobData).length ?
            <>
              <Typography>Milestones</Typography>
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
            </>
            :
            <Box width='100%' display='flex' justifyContent='center' pt={4}>
              <CircularProgress />
            </Box>
          }
          {calcProgress() === 100 &&
            <Box display='flex' justifyContent='center' mt={2}>
              <Button typ='button' variant='contained' onClick={handleButtonClick}>Generate invoice</Button>
            </Box>}
        </Paper>
        <Paper sx={{ pt: 4, px: 4, ml: 5 }}>
          <Calendar months={months} month={month} setMonth={setMonth} hoveredDate={hoveredDate} years={years} setYear={setYear} year={year} />
        </Paper>
      </Box>
    </Box>
  )

}