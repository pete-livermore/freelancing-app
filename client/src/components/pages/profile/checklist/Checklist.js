import React, { useState } from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Checkbox from '@mui/material/Checkbox'

export default function CheckList({ milestones, setHoveredDate, months, setMonth }) {
  const [checked, setChecked] = useState([0])

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  const handleMouseEnter = (milestone) => {
    const month = new Date(milestone).getMonth()
    setMonth(months[month])
    setHoveredDate(milestone)
  }

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {milestones.map(milestone => {
        const labelId = `checkbox-list-label-${milestone.name}`

        return (
          <ListItem
            key={milestone.id}
            disablePadding
          >
            <ListItemButton role={undefined} onClick={handleToggle(milestone.name)} dense>
              <ListItemText id={labelId} onMouseEnter={() => handleMouseEnter(milestone.due_date)} primary={`${milestone.name} (${new Date(milestone.due_date).toLocaleDateString()})`} />
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