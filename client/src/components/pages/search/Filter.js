import React, { useState } from 'react'
import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import ListItemText from '@mui/material/ListItemText'
import Select from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

const Filter = ({ options, dataToFilter, setFilteredData }) => {
  const [selectedOptions, setSelectedOptions] = useState([])

  const handleChange = (e) => {
    setSelectedOptions(
      typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value,
    )
    const filtered = dataToFilter.filter(job => e.target.value.includes(job.sector[0].name))
    setFilteredData(filtered)
  }

  return (
    <Box>
      <Typography>
        Filter by job category
      </Typography>
      <FormControl sx={{ m: 1, width: 400 }}>
        <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedOptions}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option} sx={{ m: 1, width: 400 }}>
              <Checkbox checked={selectedOptions.indexOf(option) > -1} />
              <ListItemText disableTypography primary={<Typography type="body2" style={{ color: 'black' }}>{option}</Typography>} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default Filter