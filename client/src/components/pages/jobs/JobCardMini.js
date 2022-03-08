import React from 'react'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'

export default function JobCardMini({ job }) {

  return (
    <Card sx={{ display: 'flex', boxShadow: '0px 0px 17px -2px rgba(30,136,229,0.72)' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {job.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {job.company.name}
          </Typography>
          <LinearProgress variant='determinate' value={70} />
        </CardContent>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        src={job.company.logo}
        alt="Live from space album cover"
      />
    </Card>
  )
}