import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Box from '@mui/material/Box'
import Form from './Form'

const Auth = ({ selectedPage }) => {
  return (
    <Box display='flex' justifyContent='center' alignItems='center'>
      <Box bgcolor='white' p={6} maxWidth='500px' borderRadius={2} mt={4}>
        <Form formType={selectedPage} />
      </Box>
    </Box>
  )
}

export default Auth