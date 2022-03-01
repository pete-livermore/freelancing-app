import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Form from '../../auth/Form'

const Register = () => {


  return (
    <Box display='flex' justifyContent='center' alignItems='center'>
      <Box bgcolor='white' p={6} maxWidth='500px' borderRadius={2} mt={4}>
        <Form formType='Register' />
      </Box>
    </Box>
  )
}

export default Register