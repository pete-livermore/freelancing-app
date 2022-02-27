import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Box'
import arrowRight from '../assets/images/fast-forward-right.png'
import arrowLeft from '../assets/images/fast-forward-left.png'

const Calendar = () => {
  const years = [2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030]
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']
  const [month, setMonth] = useState(months[new Date().getMonth()])
  const [year, setYear] = useState(years[years.indexOf(new Date().getFullYear())])
  const [daysInMonth, setDaysInMonth] = useState(0)
  const today = new Date()
  console.log(today.getDay())
  const currentDate = new Date()
  currentDate.setUTCDate(currentDate.getUTCDate() + 1)
  console.log(currentDate.getDay())

  const handleYearChange = (e) => {
    setYear(parseInt(e.target.value))
  }

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
      arr.push(<Box sx={{ width: 75, height: 50, py: 5, px: 2 }} key={i} id={i}></Box>)
    }
    let inc = 1
    for (let i = new Date(`${month} 1, ${year}`).getDay(); i < new Date(`${month} 1, ${year}`).getDay() + daysInMonth; i++) {
      let idDate = new Date(`${month} ${inc}, ${year}`)
      arr[i] = <Box id={idDate} sx={{ width: 75, height: 50, py: 5, px: 2 }}>{inc}</Box>
      inc++
      idDate.setDate(idDate.getDate() + 1)
    }
    console.log(arr)
    return arr
  }
  CalendarBuild()

  return (
    <Container maxWidth="sm" sx={{ boxShadow: 1, p: 3, backgroundColor: 'primary.main' }}>
      <label htmlFor='years'>Select year:</label>
      <select onChange={handleYearChange} value={year} name='years'>
        {years.map(year => {
          return <option key={year} value={year}>{year}</option>
        })
        }
      </select>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          {year === 2022 && month === 'January' ? '' : <img className='scroll-arrow' src={arrowLeft} alt='back-arrow' onClick={handleBackwardClick} />}
        </Box>
        <Box>
          <h1>{month}</h1>
        </Box>
        <Box>
          {year === 2030 && month === 'December' ? '' : <img className='scroll-arrow' src={arrowRight} alt='forward-arrow' onClick={handleForwardClick} />}
        </Box>
      </Box>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {days.map(day => {
            return <Box sx={{ width: 75, pl: 1, fontWeight: 'bold' }}>{day}</Box>
          })}
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>{CalendarBuild()}</Box>
      </Box>
    </Container>
  )
}

export default Calendar