import React, { useState } from 'react'
import ReviewBox from './ReviewBox'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import CreateIcon from '@mui/icons-material/Create'
import ReviewModal from './ReviewModal'

export default function Reviews({ profileData }) {
  const [iconClicked, setIconClicked] = useState(false)

  const handleIconClick = (e) => {
    setIconClicked(true)
  }

  return (
    <>
      <Box display='flex' justifyContent='space-between'>
        <Typography variant='h6' component='h2'>
          Testimonials/reviews
        </Typography>
        <Button onClick={handleIconClick}>
          Add a review
          <CreateIcon sx={{ ml: '5px', cursor: 'pointer', pb: '5px' }} />
        </Button>
      </Box>
      {profileData.received_reviews.map(review => {
        return <ReviewBox key={review.id} review={review} />
      })}
      <ReviewModal iconClicked={iconClicked} profileData={profileData} setIconClicked={setIconClicked} />
    </>
  )
}