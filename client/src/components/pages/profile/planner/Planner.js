import React, { useState, useEffect } from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Calendar from './Calendar'

const Planner = () => {
  const years = [2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030]
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']
  const [year, setYear] = useState(years[years.indexOf(new Date().getFullYear())])
  const [month, setMonth] = useState(months[new Date().getMonth()])

  const handleYearChange = (e) => {
    setYear(parseInt(e.target.value))
  }

  return (
    <Container>
      <label htmlFor='years'>Select year:</label>
      <select onChange={handleYearChange} value={year} name='years'>
        {years.map(year => {
          return <option key={year} value={year}>{year}</option>
        })
        }
      </select>
      <Box display='flex'>
        <Box sx={{ boxShadow: 1, p: 3, backgroundColor: 'white', borderRadius: '2%' }}>
          <Calendar year={year} years={years} setYear={setYear} months={months} month={month} setMonth={setMonth} days={days} />
        </Box>
        <Box>Other stats here</Box>
      </Box>
    </Container>

  )
}

export default Planner