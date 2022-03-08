import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'

export default function Calendar({ profileData, months, month, setMonth, hoveredDate }) {
  const years = [2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030]
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const [year, setYear] = useState(years[years.indexOf(new Date().getFullYear())])
  const [daysInMonth, setDaysInMonth] = useState(0)
  const today = new Date()
  const currentDate = new Date()
  currentDate.setUTCDate(currentDate.getUTCDate() + 1)

  const handleForwardClick = () => {
    if (month !== 'December') setMonth(months[months.indexOf(month) + 1])
    else {
      setMonth('January')
      setYear(years[years.indexOf(year) + 1])
    }
  }

  const handleBackwardClick = () => {
    if (month !== 'January') setMonth(months[months.indexOf(month) - 1])
    else {
      setMonth('December')
      if (year !== 2022)
        setYear(years[years.indexOf(year) - 1])
    }
  }

  profileData.jobs.length && profileData.jobs.forEach(job => {
    console.log(job.date_listed, job.completion_date)
  })

  useEffect(() => {
    let numOfDaysInMonth
    if (month === 'February') {
      if (year === 2024 || year === 2028 || year === 2032) {
        numOfDaysInMonth = 29
      } else numOfDaysInMonth = 28
    } else if (month === 'April' || month === 'June' || month === 'September' || month === 'November') {
      numOfDaysInMonth = 30
    }
    else numOfDaysInMonth = 31
    setDaysInMonth(numOfDaysInMonth)
  }, [month, year])

  const CalendarBuild = () => {
    const arr = []
    for (let i = 0; i < 42; i++) {
      arr.push(<Box sx={{ pl: '8px', mr: '8px', height: '35px' }} key={i} id={i}></Box>)
    }
    let inc = 1
    for (let i = new Date(`${month} 1, ${year}`).getDay(); i < new Date(`${month} 1, ${year}`).getDay() + daysInMonth; i++) {
      let idDate = new Date(`${month} ${inc}, ${year}`)
      if (idDate.toLocaleDateString() === today.toLocaleDateString())
        arr[i] = <Box id={idDate} key={idDate} sx={{ backgroundColor: '#33c9dc', pl: '8px', mr: '8px', height: '35px' }}>{inc}</Box>
      else if (idDate.toLocaleDateString() === new Date(hoveredDate).toLocaleDateString()) arr[i] = <Box id={idDate} key={idDate} sx={{ backgroundColor: '#8e24aa', pl: '8px', mr: '8px', height: '35px' }}>{inc}</Box>
      else arr[i] = <Box id={idDate} key={idDate} sx={{ pl: '8px', mr: '8px', height: '35px' }}>{inc}</Box>
      inc++
      idDate.setDate(idDate.getDate() + 1)
    }
    return arr
  }
  CalendarBuild()

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box width='50px' mb={6}>
          {year === 2022 && month === 'January' ? '' : <ArrowBackIosIcon sx={{ cursor: 'pointer' }} onClick={handleBackwardClick} />}
        </Box>
        <Box>
          <Typography variant='h5' align='center' component='h3'>{month}</Typography>
          <Typography variant='h7' align='center' component='h4'>{year}</Typography>
        </Box>
        <Box width='50px'>
          {year === 2030 && month === 'December' ? '' : <ArrowForwardIosIcon sx={{ cursor: 'pointer' }} onClick={handleForwardClick} />}
        </Box>
      </Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: '55px 55px 55px 55px 55px 55px 55px', gridGap: '5px' }}>
        {days && days.map(day => {
          return <Box key={day} sx={{ pl: 1, fontWeight: 'bold' }}>{day}</Box>
        })}
        {CalendarBuild()}
      </Box>
    </>
  )
}