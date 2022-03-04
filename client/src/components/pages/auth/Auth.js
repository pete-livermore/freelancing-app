import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ReactCardFlip from 'react-card-flip'
import Form from './Form'

const Auth = ({ selectedPage }) => {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <>
      <Box display='flex' justifyContent='center' alignItems='center'>
        <Box bgcolor='white' p={6} maxWidth='500px' borderRadius={2} mt={4}>
          {selectedPage === 'Register' ?
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
              <Form formType='Register' setIsFlipped={setIsFlipped} isFlipped={isFlipped} />
              <Form formType='Log in' setIsFlipped={setIsFlipped} isFlipped={isFlipped} />
            </ReactCardFlip>
            :
            <Form formType='Log in'></Form>
          }
        </Box>
      </Box>
    </>
  )
}

export default Auth