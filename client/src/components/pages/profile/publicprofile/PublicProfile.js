import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Rating from '@mui/material/Rating'
import List from '@mui/material/List'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import GitHubIcon from '@mui/icons-material/GitHub'
import WebIcon from '@mui/icons-material/Web'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import Button from '@mui/material/Button'
import CreateIcon from '@mui/icons-material/Create'
import ReviewModal from '../reviews/ReviewModal'
import ReviewBox from '../reviews/ReviewBox'

export default function PublicProfile() {
  const [iconClicked, setIconClicked] = useState(false)
  const { userId } = useParams()
  const [hasErrors, setHasErrors] = useState({ error: true, message: '' })
  const [profileData, setProfileData] = useState({})
  const token = window.localStorage.getItem('outsourcd-token')

  const userRatings = Object.keys(profileData).length ? profileData.received_reviews.map(review => review.rating) : 0

  const calculateMedianRating = (array) => {
    const sortedArray = array.sort((a, b) => {
      return a - b
    })
    if (sortedArray.length % 2 === 0) {
      return (sortedArray[(sortedArray.length / 2) - 1] + sortedArray[sortedArray.length / 2]) / 2
    } else return sortedArray[Math.floor((sortedArray.length) / 2)]
  }

  const IconSelector = () => {
    if (profileData.personal_website.includes('github')) {
      return <GitHubIcon fontSize='large' sx={{ color: 'white' }} />
    } else return <WebIcon fontSize='large' sx={{ color: 'white' }} />
  }

  const formattedMonth = (date) => {
    return new Date(date).toLocaleString('default', { month: 'short' })
  }

  const formattedYear = (date) => {
    return new Date(date).getFullYear()
  }

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const { data } = await axios.get(`/api/profiles/${userId}/`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setProfileData(data)
      } catch (err) {
        setHasErrors({ error: true, message: err.message })
      }
    }
    getProfileData()
  }, [userId, setProfileData, token])

  const handleIconClick = (e) => {
    setIconClicked(true)
  }

  return (
    <Container sx={{ mt: 12 }} maxWidth='xl'>
      {Object.keys(profileData).length ?
        <>
          <Paper sx={{ display: 'flex', backgroundColor: '#182b3a', p: 4 }}>
            <Box mr={8}>
              <Box width='175px' height='175px' backgroundColor='#C2185B' borderRadius='50%' pt='3px' pl='3px' >
                <Avatar
                  alt={`${profileData.first_name} ${profileData.last_name}`}
                  src={profileData.profile_image}
                  sx={{ width: 168, height: 168, boxShadow: 2 }}
                />
              </Box>
            </Box>
            <Box display='flex' flexDirection='column' justifyContent='space-between'>
              <Box>
                <Typography variant='h3' color='white'>{`${profileData.first_name} ${profileData.last_name}`}</Typography>
                <Typography variant='h5' color='white' >{profileData.job_title}</Typography>
                <Typography variant='h6' color='white' >{profileData.country}</Typography>
                <Rating
                  name="user-rating"
                  precision={0.5}
                  value={calculateMedianRating(userRatings)}
                  readOnly
                />
              </Box>
              <Stack direction='row' spacing={1}>
                <a href={profileData.linkedin_url} target='_blank' rel='noreferrer'><LinkedInIcon fontSize='large' sx={{ color: 'white' }} /></a>
                <a href={profileData.personal_website} target='_blank' rel='noreferrer'>{IconSelector()}</a>
              </Stack>
            </Box>
          </Paper>
          <Box display='flex' mt={5}>
            <Paper sx={{ p: 4 }}>
              <Typography variant='h6'>About me</Typography>
              <Typography>{profileData.about_me}</Typography>
            </Paper>
            {profileData.experience.length ?
              <>
                <Paper sx={{ width: '100%', maxWidth: 450, ml: 3, p: 4 }}>
                  <List>
                    <Typography variant='h6'>Professional experience</Typography>
                    {profileData.experience.map(job => (
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
                    )}
                  </List>
                </Paper>
              </>
              :
              ''
            }
          </Box>
          <Paper sx={{ p: 4, mt: 6 }}>
            <Box display='flex' justifyContent='space-between'>
              <Typography variant='h6'>Reviews</Typography>
              <Button onClick={handleIconClick}>
                Add a review
                <CreateIcon sx={{ ml: '5px', cursor: 'pointer', pb: '5px' }} />
              </Button>
            </Box>
            {profileData.received_reviews.length ?
              profileData.received_reviews.map(review => {
                return <ReviewBox key={review.id} review={review} />
              })
              :
              <Typography>No reviews received yet</Typography>
            }
            <ReviewModal iconClicked={iconClicked} profileData={profileData} setIconClicked={setIconClicked} />
          </Paper>
        </>
        :
        hasErrors.error ?
          <p>hasErrors.message</p>
          :
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
      }
    </Container>
  )
}