import React from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Rating from '@mui/material/Rating'

export default function ReviewBox({ review }) {

  return (
    <Box display='flex' mt={3}>
      <Box mr={2} display='flex' minWidth='250px'>
        <Box mr={2}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </Box>
        <Box>
          <Typography>Karen Taylor</Typography>
          <Typography fontSize='14px' sx={{ color: 'gray' }}>Product Strategy Lead</Typography>
          <Typography fontSize='14px' sx={{ color: 'gray' }}>Really Cool Company</Typography>
        </Box>
      </Box>
      <Box>
        <Typography fontSize='15px'>
          {review.text}
        </Typography>
        <Rating name="rating" value={review.rating} readOnly />
        <Typography fontSize='14px' sx={{ color: 'gray' }}>
          {new Date(review.created_at).toLocaleDateString()}
        </Typography>
      </Box>
    </Box>
  )
}
