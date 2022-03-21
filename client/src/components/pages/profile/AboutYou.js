import React, { useState } from 'react'
import axios from 'axios'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import SkillsModal from './SkillsModal'
import WebIcon from '@mui/icons-material/Web'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import EditIcon from '@mui/icons-material/Edit';
import ExperienceModal from './experience/ExperienceModal'


export default function AboutYou({ profileData, setProfileData, textInput, setTextInput, setSkillsAdded, skillsAdded }) {
  const [experienceModalOpen, setExperienceModalOpen] = useState(false)
  const [error, setError] = useState({ error: false, message: '' })

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
        setError({ error: true, message: err.message })
      }
    }
    deleteSkill()
  }

  const handleProfileTextClick = () => {
    setTextInput({ ...textInput, input: true })
  }

  const handleProfileTextInput = (e) => {
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
        setError({ error: true, message: err.message })
      }
    }
    postData()
  }

  const handleCancelClick = (e) => {
    setTextInput({ input: false, text: '' })
  }

  const handleExperienceTextClick = () => {
    setExperienceModalOpen(true)
  }

  const formattedMonth = (date) => {
    return new Date(date).toLocaleString('default', { month: 'short' })
  }

  const formattedYear = (date) => {
    return new Date(date).getFullYear()
  }

  return (
    <>
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Box display='flex' justifyContent='space-between'>
          <Typography variant='h6' component='h2'>About you</Typography>
          <Button onClick={handleProfileTextClick}
            endIcon={<EditIcon />}>
            Edit</Button>
        </Box>
        {!textInput.input ?
          <Box className='profile-text-Box'>
            {profileData.about_me ?
              <>
                <Typography
                  component="div"
                  sx={{ fontSize: '15px', color: '#1a1a1a', mt: '5px', width: '100%', px: '15px', py: '20px' }}>
                  {profileData.about_me}
                </Typography>
              </>
              : 'Click to add...'}
          </Box>
          :
          <>
            <Box width='100%' borderRadius='5px' minHeight='100px'>
              <form onSubmit={handleProfileTextSubmit} style={{ height: '100%' }}>
                <TextField
                  onChange={handleProfileTextInput}
                  style={{ fontSize: '15px', color: '#1a1a1a', backgroundColor: 'white', borderRadius: '5px', width: '100%', height: '100%', border: 'none' }}
                  type='text'
                  value={textInput.text}
                  sx={{ mt: 2, mb: 2 }}
                  multiline
                  rows={4}
                />
                <Stack spacing={2} direction='row' mb={2}>
                  <Button variant='contained' type='input'>Submit</Button>
                  <Button variant='outlined' onClick={handleCancelClick}>Cancel</Button>
                </Stack>
              </form>
            </Box>
          </>
        }
        <List>
          <ListItem>
            <ListItemAvatar>
              <a href={`${profileData.business_website}`} rel='noreferrer' target='_blank'>
                <Avatar>
                  <WebIcon />
                </Avatar>
              </a>
            </ListItemAvatar>
            <ListItemText primary='Personal website' />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <a href={`${profileData.linkedin_url}`} rel='noreferrer' target='_blank'>
                <Avatar>
                  <LinkedInIcon />
                </Avatar>
              </a>
            </ListItemAvatar>
            <ListItemText primary='LinkedIn' />
          </ListItem>
        </List>
      </Paper>
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant='h6' component='h2'>Skills</Typography>
        <Box p={1} mt={2} width='100%' spacing={1} display='flex' flexWrap='wrap' justifyContent='flex-start'>
          {profileData.skills.map(skill => {
            return (<Chip
              key={skill.id}
              id={skill.id}
              label={skill.name}
              onDelete={handleChipDelete(skill.id)}
              sx={{ mt: '5px', mr: '5px' }} />
            )
          })}
        </Box>
        <SkillsModal skillsAdded={skillsAdded} profileData={profileData} setSkillsAdded={setSkillsAdded} />
      </Paper>
      <Paper elevation={3} sx={{ p: 4, mb: 4, width: '100%' }}>
        <Box display='flex' justifyContent='space-between'>
          <Typography variant='h6' component='h2'>Professional experience</Typography>
          <Button onClick={handleExperienceTextClick}
            endIcon={<EditIcon />}>
            Add</Button>
        </Box>
        <ExperienceModal experienceModalOpen={experienceModalOpen} setExperienceModalOpen={setExperienceModalOpen} profileData={profileData} />
        {profileData.experience ?
          <List sx={{ width: '100%', maxWidth: 450, bgcolor: 'background.paper' }}>
            {profileData.experience.map(job => {
              return (
                <ListItem key={job.id}>
                  <ListItemAvatar>
                    <Avatar>
                      <img src={job.company_name.logo} alt={job.company_name.name} />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={job.job_title} secondary={job.company_name.name} />
                  <p>{`${formattedMonth(job.start_date)} ${formattedYear(job.start_date)} ${String.fromCharCode(8211)} ${formattedMonth(job.end_date)} ${formattedYear(job.end_date)}`}</p>
                </ListItem>
              )
            })}
          </List>
          :
          <Typography sx={{ mt: 4 }}>Adding your professional experience will better showcase your skills to clients</Typography>
        }
      </Paper>
    </>
  )
}