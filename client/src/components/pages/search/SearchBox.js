import React, { useState } from 'react'
import axios from 'axios'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Chip from '@mui/material/Chip'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'

const SearchBox = ({ label, searchedData }) => {
  const [searchString, setSearchString] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [clicked, setClicked] = useState(false)
  const [activeIndices, setActiveIndices] = useState([])

  const style1 = { backgroundColor: '#6b0d32', mt: '5px', mr: '5px' }
  const style2 = { backgroundColor: '#C2185B', mt: '5px', mr: '5px' }

  const handleSearchInput = (e) => {
    setSearchString(e.target.value)
    const filteredData = searchedData.filter(obj => obj.name.includes(searchString))
    setSearchResults(filteredData)

    // const getSearchResults = async () => {
    //   try {
    //     await axios.get('')
    //   } catch (err) {

    //   }
    // }
  }

  const handleChipAdd = (label) => () => {
    console.log(label)
    // const filteredSkills = profileData.skills.filter(skill => skill.id !== label)
    // setProfileData({ ...profileData, 'skills': filteredSkills })
    // const mappedSkills = filteredSkills.map(skill => skill.id)
    // const dataToSend = {
    //   'password': profileData.password,
    //   'email': profileData.email,
    //   'username': profileData.username,
    //   'skills': mappedSkills
    // }
    // console.log(dataToSend)
    // const deleteSkill = async () => {
    //   try {
    //     const token = localStorage.getItem('outsourcd-token')
    //     await axios.put('/api/profiles/profile/', dataToSend,
    //       {
    //         'headers': {
    //           'Authorization': 'Bearer ' + token
    //         }
    //       })
    //   } catch (err) {
    //     console.log(err)
    //   }
    // }
    // deleteSkill()
  }

  console.log(activeIndices)

  const handleChipClick = (result, i) => {
    const arr = [...activeIndices]
    console.log(result, i)
    arr.push(i)
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
      <Box p={1} width='100%' spacing={1} display='flex' flexWrap='wrap' justifyContent='flex-start'>
        {searchResults.map((result, i) => {
          return <Chip
            onClick={() => handleChipClick(result, i)}
            key={result.id}
            id={result.id}
            label={result.name}
            sx={activeIndices.includes(i) ? style1 : style2}
            icon={<AddIcon onClick={handleChipAdd} />}
          />
        })}
      </Box>
    </Box>
  )
}

export default SearchBox