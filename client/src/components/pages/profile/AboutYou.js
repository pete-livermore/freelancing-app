import React from 'react'
import axios from 'axios'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import SkillsModal from './SkillsModal'
import WebIcon from '@mui/icons-material/Web'
import LinkedInIcon from '@mui/icons-material/LinkedIn'


export default function AboutYou({ profileData, setProfileData, textInput, setTextInput, setSkillsAdded }) {

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
    <>
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant='h5' component='h2'>About you</Typography>
        {!textInput.input ?
          <Box onClick={handleProfileTextClick} className='profile-text-Box'>
            {profileData.about_me ?
              <>
                <Typography
                  component="div"
                  sx={{ fontSize: '15px', color: '#1a1a1a', mt: '5px', width: '100%', px: '15px', py: '20px' }}>
                  {profileData.about_me}
                </Typography>
                <List>
                  <ListItem>
                    <ListItemAvatar>
                      <Link to={`${profileData.business_website}`} sx={{ textDecoration: 'none' }}>
                        <Avatar>
                          <WebIcon />
                        </Avatar>
                      </Link>
                    </ListItemAvatar>
                    <ListItemText primary='Personal website' />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Link to={`${profileData.linkedin_url}`} sx={{ color: 'white' }}>
                        <Avatar>
                          <LinkedInIcon />
                        </Avatar>
                      </Link>
                    </ListItemAvatar>
                    <ListItemText primary='LinkedIn' />
                  </ListItem>
                </List>
              </>
              : 'Click to add...'}
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
      </Paper>
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant='h5' component='h2'>Skills</Typography>
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
        <SkillsModal profileData={profileData} setSkillsAdded={setSkillsAdded} />
      </Paper>
      <Paper elevation={3} sx={{ p: 4, mb: 4, width: '100%' }}>
        <Typography variant='h5' component='h2'>Professional experience</Typography>
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
                <p>{`${job.start_year} - ${job.end_year}`}</p>
              </ListItem>
            )
          })}
        </List>
      </Paper>
    </>
  )
}