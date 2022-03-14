import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import WorkHistoryIcon from '@mui/icons-material/WorkHistory'
import ProfileImageModal from './ProfileImageModal'
import FaceIcon from '@mui/icons-material/Face'
import ReviewsIcon from '@mui/icons-material/Reviews'
import EditIcon from '@mui/icons-material/Edit'
import WorkIcon from '@mui/icons-material/Work'
import CurrentJobs from './currentJobs/CurrentJobs'
import AboutYou from './AboutYou'
import Rating from '@mui/material/Rating'
import WorkHistory from './WorkHistory'
import Reviews from './reviews/Reviews'

const drawerWidth = 300;

export default function SideNav({ profileData, setImageUploaded, setMilestoneUpdated, setProfileData, textInput, setTextInput, setSkillsAdded, skillsAdded }) {
  const [avatarClicked, setAvatarClicked] = useState(false)
  const handleAvatarClick = () => {
    if (!avatarClicked) setAvatarClicked(true)
    else setAvatarClicked(false)
  }
  const [selectedSection, setSelectedSection] = useState(0)
  const [editable, setEditable] = useState(false)

  const sections = ['About you', 'Current jobs', 'Job history', 'Reviews']
  const iconSelector = (index) => {
    if (index === 0) return <FaceIcon />
    if (index === 1) return <WorkIcon />
    if (index === 2) return <WorkHistoryIcon />
    if (index === 3) return <ReviewsIcon />
  }

  const handleListClick = (index) => {
    setSelectedSection(index)
  }
  const userRatings = profileData.received_reviews.map(review => {
    return review.rating
  })

  const calculateMedianRating = (array) => {
    const sortedArray = array.sort((a, b) => {
      return a - b
    })
    if (sortedArray.length % 2 === 0) {
      return (sortedArray[(sortedArray.length / 2) - 1] + sortedArray[sortedArray.length / 2]) / 2
    } else return sortedArray[Math.floor((sortedArray.length) / 2)]
  }

  const handleAvatarHover = () => {
    setEditable(true)
  }

  const handleAvatarLeave = () => {
    setEditable(false)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box display='flex' flexDirection='column' alignItems='center' p={3} mt={3} backgroundColor='#182b3a' color='white' position='relative'>
          {editable && <EditIcon fontSize='small' sx={{ position: 'absolute', right: 55, top: 25, color: '#C2185B' }} />}
          <Box width='133px' height='133px' backgroundColor='#C2185B' borderRadius='50%' pt='3px' pl='3px' >
            <Avatar
              onClick={handleAvatarClick}
              onMouseEnter={handleAvatarHover}
              onMouseLeave={handleAvatarLeave}
              alt="Remy Sharp"
              src={profileData.profile_image}
              sx={{ width: 126, height: 126, boxShadow: 2, cursor: 'pointer' }}
            />
            <ProfileImageModal profileData={profileData} avatarClicked={avatarClicked} setAvatarClicked={setAvatarClicked} setImageUploaded={setImageUploaded} />
          </Box>
          <Typography component='h6' variant='h6' sx={{ mt: 1 }}>{`${profileData.first_name} ${profileData.last_name}`}</Typography>
          <Typography sx={{ fontWeight: 600, mt: 1 }}>{profileData.job_title}</Typography>
          <Typography sx={{ mt: 3, mb: 2 }} component="legend">Current rating:</Typography>
          <Rating
            name="simple-controlled"
            precision={0.5}
            value={calculateMedianRating(userRatings)}
            readOnly
          />
        </Box>
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {sections.map((section, index) => (
              <ListItem button key={section} onClick={() => handleListClick(index)}>
                <ListItemIcon>
                  {iconSelector(index)}
                </ListItemIcon>
                <ListItemText primary={section} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" backgroundColor='#eceff1' flexGrow={1} py={5} px={8} minHeight='100vh' height='100%' mb={0}>
        <Toolbar />
        {selectedSection === 0 &&
          <AboutYou profileData={profileData} setProfileData={setProfileData} textInput={textInput} setTextInput={setTextInput} setSkillsAdded={setSkillsAdded} skillsAdded={skillsAdded} />}
        {selectedSection === 1 &&
          <CurrentJobs profileData={profileData} setMilestoneUpdated={setMilestoneUpdated} />}
        {selectedSection === 2 &&
          <WorkHistory />
        }
        {selectedSection === 3 &&
          <Reviews profileData={profileData} />
        }
      </Box>
    </Box>
  );
}