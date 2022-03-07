import React, { useState } from 'react'
import axios from 'axios'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Chip from '@mui/material/Chip'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'

const SearchBox = ({ label, searchedData, searchResults, setSearchResults, setSkill, setDisabledStatus, setSkillsToAdd }) => {
  const [searchString, setSearchString] = useState('')
  const [activeIndices, setActiveIndices] = useState([])

  const style1 = { backgroundColor: '#C2185B', mt: '5px', mr: '5px' }
  const style2 = { backgroundColor: 'grey', mt: '5px', mr: '5px' }

  const handleSearchInput = (e) => {
    setSearchString(e.target.value)
    let filteredData
    if (!e.target.value.length) {
      filteredData = []
    } else {
      filteredData = searchedData.filter(obj => obj.name.replace(/ /g, ";").toLowerCase().includes(e.target.value.toLowerCase()))
      console.log(filteredData.length)
      if (!filteredData.length) {
        setSkill({ found: false, name: e.target.value, message: 'Skill not found' })
      }
    }
    setSearchResults(filteredData)
  }

  const handleChipClick = (id) => {
    setDisabledStatus(false)
    const arr = [...activeIndices]
    arr.push(id)
    const skillsForAdding = searchedData.filter(obj => arr.includes(obj.id))
    setSkillsToAdd(skillsForAdding)
    setActiveIndices(arr)
  }

  return (
    <Box>
      <TextField
        id="search-field"
        label={label}
        value={searchString}
        type="search"
        sx={{ width: '100%' }}
        onChange={handleSearchInput}
      />
      <Box mt={4} p={1} width='100%' spacing={1} display='flex' flexWrap='wrap' justifyContent='flex-start'>
        {searchResults.map(result => {
          return <Chip
            onClick={() => handleChipClick(result.id)}
            key={result.id}
            id={result.id}
            label={result.name}
            sx={activeIndices.includes(result.id) ? style1 : style2}
            icon={<AddIcon />}
          />
        })}
      </Box>
    </Box>
  )
}

export default SearchBox