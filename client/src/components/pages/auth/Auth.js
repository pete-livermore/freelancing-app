import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ReactCardFlip from 'react-card-flip'
import Form from './Form'

const Auth = ({ selectedPage }) => {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <>
      <Box display='flex' justifyContent='center' alignItems='center' mt={8}>
        <Paper elevation={2} sx={{ mt: 8, py: 4, px: 6 }}>
          {selectedPage === 'Register' ?
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
              <Form formType='Register' setIsFlipped={setIsFlipped} isFlipped={isFlipped} />
              <Form formType='Log in' setIsFlipped={setIsFlipped} isFlipped={isFlipped} />
            </ReactCardFlip>
            :
            <Form formType='Log in'></Form>
          }
        </Paper>
      </Box>
    </>
  )
}

export default Auth