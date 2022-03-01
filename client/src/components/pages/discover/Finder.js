import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Filter from './Filter'
import Search from './Search'
import DisplayCard from '../../DisplayCard'

const Finder = () => {

  return (
    <Container maxWidth='lg' sx={{ marginTop: '30px' }}>
      <Box display='flex' justifyContent='space-between' backgroundColor='white' p={2} borderRadius={1} mb={4}>
        <Filter />
        <Search />
      </Box>
      <DisplayCard />
    </Container >

  )
}

export default Finder