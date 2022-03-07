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
import ProfileImageModal from './ProfileImageModal'


const Dashboard = ({ profileData, setProfileData, setSkillsAdded, textInput, setTextInput, setImageUploaded }) => {
  const years = [2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030]
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']
  const [year, setYear] = useState(years[years.indexOf(new Date().getFullYear())])
  const [month, setMonth] = useState(months[new Date().getMonth()])
  const [value, setValue] = useState(4)
  const [avatarClicked, setAvatarClicked] = useState(false)

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

  const handleAvatarClick = () => {
    if (!avatarClicked) setAvatarClicked(true)
    else setAvatarClicked(false)
  }

  const handleProfileTextClick = () => {
    setTextInput({ ...textInput, input: true })
  }

  const handleProfileTextInput = (e) => {
    console.log(e.target.value)
    setTextInput({ ...textInput, text: e.target.value })
  }

  const handleProfileTextSubmit = (e) => {
    e.preventDefault()
    const dataToSend = {
      'password': profileData.password,
      'email': profileData.email,
      'username': profileData.username,
      'about_me': textInput.text
    }
    console.log(dataToSend)
    const postData = async () => {
      try {
        const token = localStorage.getItem('outsourcd-token')
        await axios.put('/api/profiles/profile/', dataToSend,
          {
            'headers': {
              'Authorization': `Bearer ${token}`
            }
          })
        setTextInput({ input: false, text: '' })
      } catch (err) {
        console.log(err)
      }
    }
    postData()
  }

  return (
    <Container maxWidth='xl' sx={{ mt: '25px', display: 'flex' }}>
      <Box backgroundColor='#182b3a' mr={2} width='350px' display='flex' flexDirection='column' alignItems='center' p={2} color='white' borderRadius={2}>
        <Box width='133px' height='133px' backgroundColor='#C2185B' borderRadius='50%' pt='3px' pl='3px' >
          <Avatar
            onClick={handleAvatarClick}
            alt="Remy Sharp"
            src={profileData.profile_image}
            sx={{ width: 126, height: 126, boxShadow: 2 }}
          />
          <ProfileImageModal profileData={profileData} avatarClicked={avatarClicked} setAvatarClicked={setAvatarClicked} setImageUploaded={setImageUploaded} />
        </Box>
        <p>{profileData.name}</p>
        <Typography component="legend">Current rating:</Typography>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue)
          }}
        />
        <Typography component="legend" sx={{ mt: '15px' }}>About you:</Typography>
        {!textInput.input ?
          <Box onClick={handleProfileTextClick} width='100%' backgroundColor='white' borderRadius='5px' minHeight='100px' className='profile-text-box'>
            <Typography
              component="div"
              sx={{ fontSize: '15px', color: '#1a1a1a', mt: '5px', width: '100%', px: '15px', py: '20px' }}>
              {profileData.about_me ? profileData.about_me : 'Click to add...'}
            </Typography>
          </Box>
          :
          <>
            <Box onClick={handleProfileTextClick} width='100%' borderRadius='5px' minHeight='100px'>
              <form onSubmit={handleProfileTextSubmit} style={{ height: '100%' }}>
                <input
                  onChange={handleProfileTextInput}
                  style={{ fontSize: '15px', color: '#1a1a1a', backgroundColor: 'white', borderRadius: '5px', width: '100%', height: '100%', border: 'none' }}
                  type='text'
                  value={textInput.text}
                />
                <Button type='input'>Submit</Button>
              </form>
            </Box>
          </>
        }
        <Typography component="legend" sx={{ mt: '25px' }}>Skills:</Typography>
        <Box p={1} width='100%' spacing={1} display='flex' flexWrap='wrap' justifyContent='flex-start'>
          {profileData.skills.map(skill => {
            return <Chip key={skill.id} id={skill.id} label={skill.name} onDelete={handleChipDelete(skill.id)} sx={{ backgroundColor: '#6b0d32', mt: '5px', mr: '5px' }} />
          })}
        </Box>
        <SkillsModal profileData={profileData} setSkillsAdded={setSkillsAdded} />
        <Typography component="legend" sx={{ mt: '15px' }}>Professional experience:</Typography>
        {profileData.experience.map(job => {
          return (<Box>
            <Typography component='p'>{job.job_title}</Typography>
            <p>{job.company_name.name}</p>
            <p>{`${job.start_year} - ${job.end_year}`}</p>
          </Box>)
        })}
      </Box>
      <Box flexGrow={1}>
        <Box display='flex' justifyContent='space-between' >
          <Box backgroundColor='white' flexGrow={1} p={4} mr={2} borderRadius={2}>Current jobs:
            <Box display='flex' mt={2} justifyContent='space-between'>
              {profileData.jobs.map(job => {
                return <JobCard key={job.id} job={job} />
              })
              }
              <Box flexGrow='1' p={4}>
                <CheckList /></Box>
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