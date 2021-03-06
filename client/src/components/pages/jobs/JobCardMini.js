import React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'

export default function JobCardMini({ job, calcProgress }) {

  return (
    <>
      {Object.keys(job).length &&
        <>
          <Card sx={{ display: 'flex', boxShadow: '0px 0px 17px -2px rgba(30,136,229,0.72)' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h5">
                  {job.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  {job.company.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
                  <Box sx={{ width: '100%', mr: 1 }}>
                    <LinearProgress variant='determinate' value={calcProgress()} sx={{ height: 10 }} />
                  </Box>
                  <Box sx={{ minWidth: 35 }}>
                    <Typography variant="body2" color="text.secondary">{`${Math.round(
                      calcProgress(),
                    )}%`}</Typography>
                  </Box>
                </Box>

              </CardContent>
            </Box>
            <CardMedia
              component="img"
              sx={{ width: 151 }}
              src={job.company.logo}
              alt="Live from space album cover"
            />
          </Card>
        </>
      }
    </>
  )
}