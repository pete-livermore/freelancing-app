import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Avatar from '@mui/material/Avatar'
import Calendar from '../planner/Calendar'
import Rating from '@mui/material/Rating'
import Typography from '@mui/material/Typography'
import CheckList from './Checklist'
import JobCard from '../jobs/JobCard'
import SkillsModal from './SkillsModal'


const Dashboard = ({ profileData, setProfileData }) => {
  const years = [2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030]
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']
  const [year, setYear] = useState(years[years.indexOf(new Date().getFullYear())])
  const [month, setMonth] = useState(months[new Date().getMonth()])
  const [value, setValue] = useState(4)

  const handleChipDelete = (label) => () => {
    const filteredSkills = profileData.skills.filter(skill => skill.id !== label)
    setProfileData({ ...profileData, 'skills': filteredSkills })
    const mappedSkills = filteredSkills.map(skill => skill.id)
    const dataToSend = {
      'password': profileData.password,
      'email': profileData.email,
      'username': profileData.username,
      'skills': mappedSkills
    }
    console.log(dataToSend)
    const deleteSkill = async () => {
      try {
        const token = localStorage.getItem('outsourcd-token')
        await axios.put('/api/profiles/profile/', dataToSend,
          {
            'headers': {
              'Authorization': 'Bearer ' + token
            }
          })
      } catch (err) {
        console.log(err)
      }
    }
    deleteSkill()
  }

  return (
    <Container maxWidth='xl' sx={{ mt: '25px', display: 'flex' }}>
      <Box backgroundColor='#182b3a' mr={2} width='350px' display='flex' flexDirection='column' alignItems='center' p={2} color='white' borderRadius={2}>
        <Box width='133px' height='133px' backgroundColor='#C2185B' borderRadius='50%' pt='3px' pl='3px' >
          <Avatar
            alt="Remy Sharp"
            src={profileData.profile_image}
            sx={{ width: 126, height: 126, boxShadow: 2 }}
          />
        </Box>
        <p>{profileData.name}</p>
        <Typography component="legend">Current rating</Typography>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue)
          }}
        />
        <Typography component="div" sx={{ fontSize: '15px', mt: '20px', backgroundColor: 'white', color: '#1a1a1a', px: '15px', py: '20px', borderRadius: '5px' }}>{profileData.about_me}</Typography>
        <Typography component="legend" sx={{ mt: '25px' }}>Skills:</Typography>
        <Box p={1} width='100%' spacing={1} display='flex' flexWrap='wrap' justifyContent='flex-start'>
          {profileData.skills.map(skill => {
            return <Chip key={skill.id} id={skill.id} label={skill.name} onDelete={handleChipDelete(skill.id)} sx={{ backgroundColor: '#6b0d32', mt: '5px', mr: '5px' }} />
          })}
          <SkillsModal />
        </Box>
      </Box>
      <Box flexGrow={1}>
        <Box display='flex' justifyContent='space-between' >
          <Box backgroundColor='white' flexGrow={1} p={4} mr={2} borderRadius={2}>Current jobs:
            <Box display='flex' mt={2} justifyContent='space-between'>
              {profileData.jobs.map(job => {
                return <JobCard job={job} />
              })
              }
              <Box flexGrow='1' p={4}><CheckList /></Box>
            </Box>
          </Box>
          <Box backgroundColor='white' p={2} borderRadius={2}>
            Your work planner
            <Box maxWidth='350px' minHeight='350px'>
              <Calendar year={year} years={years} setYear={setYear} months={months} month={month} setMonth={setMonth} days={days} />
              <Link to='/planner' style={{ textDecoration: 'none', color: 'black' }}>Access full planner</Link>
            </Box>
          </Box>
        </Box>
        <Box display='flex' justifyContent='space-between' mt={2}>
          <Box backgroundColor='white' minWidth='400px' p={4}>Job history:
            <Card>
              This is a job
            </Card>
          </Box>
          <Box backgroundColor='white'>
            Testimonials/reviews
          </Box>
        </Box>
      </Box>
    </Container >
  )
}

export default Dashboard