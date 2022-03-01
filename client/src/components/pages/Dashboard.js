import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Calendar from '../planner/Calendar'
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography'
import CardMedia from '@mui/material/CardMedia'
import image from '../../assets/images/home-image-1.jpg'
import eagleLogo from '../../assets/images/eagle.png'
import arrowLogo from '../../assets/images/arrow.png'


const Dashboard = () => {
  const years = [2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030]
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']
  const [year, setYear] = useState(years[years.indexOf(new Date().getFullYear())])
  const [month, setMonth] = useState(months[new Date().getMonth()])
  const [value, setValue] = React.useState(4);
  return (
    <Container maxWidth='xl' sx={{ mt: '25px', display: 'flex' }}>
      <Box backgroundColor='#182b3a' mr={2} minWidth='300px' display='flex' flexDirection='column' alignItems='center' p={2} color='white' borderRadius={2}>
        <Box width='133px' height='133px' backgroundColor='#C2185B' borderRadius='50%' pt='3px' pl='3px' >
          <Avatar
            alt="Remy Sharp"
            src={image}
            sx={{ width: 126, height: 126, boxShadow: 2 }}
          />
        </Box>
        <p>Freelancer name</p>
        <Typography component="legend">Current rating</Typography>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
      </Box>
      <Box flexGrow={1}>
        <Box display='flex' justifyContent='space-between' >
          <Box backgroundColor='white' flexGrow={1} p={4} mr={2} borderRadius={2}>Current jobs:
            <Box display='flex' mt={2} justifyContent='space-between'>
              <Card sx={{ maxWidth: 345, textAlign: 'center' }}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Develop a responsive company website
                  </Typography>
                  <Typography gutterBottom variant="h6" component="div">
                    Web development
                  </Typography>
                  <CardMedia
                    component="img"
                    height="194"
                    image={arrowLogo}
                    alt="Company logo"
                  />
                  <Typography gutterBottom variant="h6" component="div">
                    Company name
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    A short description of the job
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="medium">See full job listing</Button>
                </CardActions>
              </Card>
              <Box>Some info here</Box>
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
            More here
          </Box>
        </Box>
      </Box>
    </Container >

  )
}

export default Dashboard