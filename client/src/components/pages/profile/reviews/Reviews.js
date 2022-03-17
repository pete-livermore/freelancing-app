import React from 'react'
import ReviewBox from './ReviewBox'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'

export default function Reviews({ profileData }) {

  return (
    <Paper sx={{ p: 4 }}>
      <Box display='flex' justifyContent='space-between'>
        <Typography variant='h6' component='h2'>
          Testimonials/reviews
        </Typography>
      </Box>
      {profileData.received_reviews.length ?
        profileData.received_reviews.map(review => {
          return <ReviewBox key={review.id} review={review} />
        })
        :
        <Typography sx={{ mt: 2 }}>No reviews received yet</Typography>
      }
    </Paper>
  )
}