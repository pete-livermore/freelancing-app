import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import homeImage from '../../../assets/images/WFH.png'
import waves from '../../../assets/images/waves.png'
import { userIsAuthenticated } from '../../../helpers/auth'


const Home = ({ setSelectedPage }) => {

  const handleClick = () => {
    setSelectedPage('Register')
  }

  console.log(userIsAuthenticated())

  return (
    <>
      <Box width='100%' minHeight='400px' backgroundColor='#182b3b' pt={10}>
        <Container>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', flexGrow: 1, marginRight: '10px', mr: '15px' }}>
              <img src='https://res.cloudinary.com/di7ndofao/image/upload/v1646990753/Habit_tracker_app/Outsourcd-logos_pink_vtdtmo.png' alt='outsourcd-logo' width='200px' />
              <Typography variant="h3" component="h1" color='white' sx={{ fontWeight: '600' }}>
                Finding jobs for freelancers made easier
              </Typography>
              <Typography variant="h6" component="h2" color='#B0BEC5'>
                Find and secure work, monitor your progress with milestones and deadlines, and manage all your jobs in one place.
              </Typography>
              <Box display='flex' mt={4}>
                {/* <Link to={userIsAuthenticated() ? '/find' : `/auth`} state={{ user: 'Client', destinationPage: 'Register' }} style={{ textDecoration: 'none' }}>
                  <Button onClick={handleClick} sx={{ py: '8px', px: '15px', color: '#C2185B', backgroundColor: '#13222E', '&:hover': { backgroundColor: '#eceff1' }, mr: '30px' }}>
                    Find a freelancer
                  </Button>
                </Link> */}
                <Link to={userIsAuthenticated() ? '/find' : `/auth`} state={{ user: 'Freelancer', destinationPage: 'Register' }} style={{ textDecoration: 'none' }}>
                  <Button onClick={handleClick} sx={{ py: '8px', px: '15px', backgroundColor: '#13222E', '&:hover': { backgroundColor: '#eceff1' } }}>
                    Find a job
                  </Button>
                </Link>
              </Box>
            </Box>
            <Box maxWidth='600px'>
              <img className='home-image' src={homeImage} alt='home' width='100%' />
            </Box>
          </Box>
        </Container>
      </Box >
      <img src='https://res.cloudinary.com/di7ndofao/image/upload/v1646940253/Habit_tracker_app/wave_2_owujty.png' alt='waves' />
    </>
  )
}

export default Home