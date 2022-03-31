import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'

export default function Calendar({ months, month, setMonth, hoveredDate, years, year, setYear }) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
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

  useEffect(() => {
    let numOfDaysInMonth
    if (month === 'February') {
      if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0 )) {
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
        arr[i] = <Box id={idDate} key={idDate} sx={{ backgroundColor: '#eceff1', pl: '8px', mr: '8px', height: '35px' }}>{inc}</Box>
      else if (idDate.toLocaleDateString() === new Date(hoveredDate).toLocaleDateString()) arr[i] = <Box id={idDate} key={idDate} sx={{ backgroundColor: '#d81b60', pl: '8px', mr: '8px', height: '35px' }}>{inc}</Box>
      else arr[i] = <Box id={idDate} key={idDate} sx={{ pl: '8px', mr: '8px', height: '35px' }}>{inc}</Box>
      inc++
      idDate.setDate(idDate.getDate() + 1)
    }
    return arr
  }
  CalendarBuild()

  return (
    <>
      <Box display='flex' justifyContent='space-between' mb={2} maxWidth={400} >
        {year === 2022 && month === 'January' ? <Box mr={2}></Box> : <ArrowBackIosIcon sx={{ cursor: 'pointer' }} onClick={handleBackwardClick} />}
        <Box>
          <Typography variant='h5' align='center' component='h3'>{month}</Typography>
          <Typography variant='h7' align='center' component='h4'>{year}</Typography>
        </Box>
        {year === 2030 && month === 'December' ? '' : <ArrowForwardIosIcon sx={{ cursor: 'pointer' }} onClick={handleForwardClick} />}
      </Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: '50px 50px 50px 50px 50px 50px 50px', gridGap: '5px', mb: 2 }}>
        {days && days.map(day => {
          return <Box key={day} sx={{ pl: 1, fontWeight: 'bold' }}><Typography sx={{ fontWeight: 'bold' }}>{day}</Typography></Box>
        })}
      </Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: '50px 50px 50px 50px 50px 50px 50px', gridGap: '5px' }}>
        {CalendarBuild()}
      </Box>
    </>
  )
}
