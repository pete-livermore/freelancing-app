import React, { useState, useEffect } from 'react'
import axios from 'axios'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Checkbox from '@mui/material/Checkbox'

export default function CheckList({ selectedJob, setHoveredDate, months, setMonth, setChecklistUpdated, years, setYear, year }) {
  const { milestones } = selectedJob
  const [checked, setChecked] = useState([0])
  const token = localStorage.getItem('outsourcd-token')

  useEffect(() => {
    if (Object.keys(selectedJob).length && selectedJob.milestones.length) {
      const filtered = selectedJob.milestones.filter(milestone => milestone.completed).map(milestone => milestone.name)
      setChecked(filtered)
    }
  }, [selectedJob])


  const handleToggle = (milestone) => () => {
    console.log(milestone)
    let updatedCompletion
    if (!milestone.completed) updatedCompletion = true
    else updatedCompletion = false
    const updatedCompletedStatus = async () => {
      try {
        await axios.put(`/api/milestones/${milestone.id}/`, { ...milestone, completed: updatedCompletion },
          {
            'headers': {
              'Authorization': `Bearer ${token}`
            }
          }
        )
        setChecklistUpdated(true)
        setChecklistUpdated(false)
      } catch (err) {
        console.log(err)
      }
    }
    updatedCompletedStatus()

    const currentIndex = checked.indexOf(milestone.name)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(milestone.name)
    } else {
      newChecked.splice(currentIndex, 1)
    }
    setChecked(newChecked)
  }

  const handleChecklistEnter = (milestone) => {
    const month = new Date(milestone).getMonth()
    const currentYear = new Date(milestone).getFullYear()
    setYear(currentYear)
    setMonth(months[month])
    setHoveredDate(milestone)
  }

  const handleChecklistLeave = () => {
    setHoveredDate('')
  }

  return (
    <List onMouseLeave={handleChecklistLeave} sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {Object.keys(selectedJob).length && milestones.length && milestones.map(milestone => {
        const labelId = `checkbox-list-label-${milestone.name}`
        return (
          <ListItem
            key={milestone.id}
            disablePadding
          >
            <ListItemButton role={undefined} onClick={handleToggle(milestone)} dense>
              <ListItemText
                id={labelId}
                onMouseEnter={() => handleChecklistEnter(milestone.due_date)}
                primary={`${milestone.name} (${new Date(milestone.due_date).toLocaleDateString()})`}
              />
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(milestone.name) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        )
      })}
    </List>
  )
}