import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Avatar from '@mui/material/Avatar'
import Rating from '@mui/material/Rating'
import Typography from '@mui/material/Typography'
import SkillsModal from './SkillsModal'
import ProfileImageModal from './ProfileImageModal'
import Reviews from './reviews/Reviews'
import CurrentJobs from './currentJobs/CurrentJobs'
import Calendar from './planner/Calendar'



const Dashboard = ({ profileData, setProfileData, setSkillsAdded, textInput, setTextInput, setImageUploaded }) => {
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

  const userRatings = profileData.received_reviews.map(review => {
    return review.rating
  })

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


  const calculateMedianRating = (array) => {
    const sortedArray = array.sort((a, b) => {
      return a - b
    })
    if (sortedArray.length % 2 === 0) {
      return (sortedArray[(sortedArray.length / 2) - 1] + sortedArray[sortedArray.length / 2]) / 2
    } else return sortedArray[Math.floor((sortedArray.length) / 2)]
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
    <Container maxWidth='xl' sx={{ mt: '30px', mb: '30px', display: 'flex' }}>
      <Box backgroundColor='#182b3a' mr={5} width='700px' display='flex' flexDirection='column' alignItems='center' p={2} color='white' borderRadius={2}>
        <Box width='133px' height='133px' backgroundColor='#C2185B' borderRadius='50%' pt='3px' pl='3px' >
          <Avatar
            onClick={handleAvatarClick}
            alt="Remy Sharp"
            src={profileData.profile_image}
            sx={{ width: 126, height: 126, boxShadow: 2, cursor: 'pointer' }}
          />
          <ProfileImageModal profileData={profileData} avatarClicked={avatarClicked} setAvatarClicked={setAvatarClicked} setImageUploaded={setImageUploaded} />
        </Box>
        <p>{profileData.name}</p>
        <Typography component="legend">Current rating:</Typography>
        <Rating
          name="simple-controlled"
          precision={0.5}
          value={calculateMedianRating(userRatings)}
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
        <CurrentJobs profileData={profileData} />
        <Box display='flex' justifyContent='space-between' mt={2}>
          <Paper sx={{ p: '20px', mr: '15px', minWidth: '400px', mb: '25px' }}>
            <Typography variant='h6' component='h2'>
              Job history
            </Typography>
            <Card>
              This is a job
            </Card>
          </Paper>
          <Paper sx={{ p: '25px', mb: '25px' }}>
            <Reviews profileData={profileData} />
          </Paper>
        </Box>
      </Box>
    </Container >
  )
}

export default Dashboard