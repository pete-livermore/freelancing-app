import React, { useState } from "react"
import Checkbox from '@mui/material/Checkbox'
import InputLabel from '@mui/material/InputLabel'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import FormControl from "@mui/material/FormControl"


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  },
  getContentAnchorEl: null,
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "center"
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "center"
  },
  variant: "menu"
}

function MultiSelect({ skills, formValues, setFormValues }) {

  const styles = {
    formControl: {
      margin: 1,
      width: 300
    },
    indeterminateColor: {
      color: "#f50057"
    },
    selectAllText: {
      fontWeight: 500
    },
    selectedAll: {
      backgroundColor: "rgba(0, 0, 0, 0.08)",
      "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.08)"
      }
    }
  }
  const [selected, setSelected] = useState([])

  const handleChange = (e) => {
    setSelected(e.target.value)
    const newSkills = [...skills]
    const filteredSkills = newSkills.filter(skill => e.target.value.includes(skill.name)).map(skill => skill.id)
    setFormValues({ ...formValues, skills: filteredSkills })
  }

  return (
    <FormControl sx={{ mt: 3 }}>
      <InputLabel id="mutiple-select-label">Multiple Select</InputLabel>
      <Select
        labelId="mutiple-select-label"
        multiple
        value={selected}
        onChange={handleChange}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={MenuProps}
      >
        {skills.length && skills.map(skill => (
          <MenuItem key={skill.id} value={skill.name}>
            <ListItemIcon>
              <Checkbox checked={selected.indexOf(skill.name) > -1} />
            </ListItemIcon>
            <ListItemText primary={skill.name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default MultiSelect
