import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Stack from '@mui/material/Stack'
import Alert from '@mui/material/Alert'
import SearchBox from '../search/SearchBox'

export default function SkillsModal({ profileData, setSkillsAdded, skillsAdded }) {
  const [skillsData, setSkillsData] = useState([])
  const [open, setOpen] = useState(false)
  const [skill, setSkill] = useState({ name: '', found: true, message: '', id: 0 })
  const [error, setError] = useState({ errror: false, message: ' ' })
  const [searchResults, setSearchResults] = useState([])
  const [disabledStatus, setDisabledStatus] = useState(true)
  const [skillsToAdd, setSkillsToAdd] = useState([])

  useEffect(() => {
    const getSkills = async () => {
      try {
        const { data } = await axios.get('api/skills/')
        setSkillsData(data)
      } catch (err) {
        setError({ error: true, message: err.message })
      }
    }
    getSkills()
  }, [skillsAdded])

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setSearchResults([])
    setSkill({ ...skill, found: true, message: '' })
  }

  const handleAddSkill = () => {
    const addSkill = async () => {
      const token = localStorage.getItem('outsourcd-token')
      const dataToSend = { 'name': skill.name }
      console.log(dataToSend)
      try {
        await axios.post('/api/skills/', dataToSend,
          {
            'headers': {
              'Authorization': 'Bearer ' + token
            }
          })
        setSearchResults([{ ...skill }])
        setSkill({ name: '', found: true, message: '' })
      } catch (error) {
        setError({
          error: true,
          message: error.response.data.name[0]
        })
      }
    }
    addSkill()
  }
  console.log(searchResults)

  const handleFormSubmit = (e) => {
    e.preventDefault()
    console.log(skillsToAdd)
    const mappedCurrentSkills = profileData.skills.map(obj => obj.id)

    skillsToAdd.forEach(skill => {
      if (mappedCurrentSkills.indexOf(skill.id) === - 1) {
        mappedCurrentSkills.push(skill.id)
      }
    })
    console.log(mappedCurrentSkills)
    const dataToSend = {
      'password': profileData.password,
      'email': profileData.email,
      'username': profileData.username,
      'skills': mappedCurrentSkills
    }
    const addSkillsToProfile = async () => {
      try {
        const token = localStorage.getItem('outsourcd-token')
        await axios.put('/api/profiles/profile/', dataToSend,
          {
            'headers': {
              'Authorization': 'Bearer ' + token
            }
          })
        handleClose()
        setSkillsAdded(true)
        setSkillsAdded(false)
        setSearchResults([])
      } catch (err) {
        setError({ error: true, message: err.message })
      }
    }
    addSkillsToProfile()
  }

  return (
    <>
      <Button sx={{ mt: 3 }} variant='contained' onClick={handleOpen}>Add skills</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box display='flex' justifyContent='center' alignItems='center' height='100vh'>
          <Box backgroundColor='white' p={6} borderRadius={2} width='600px' boxShadow={24} maxHeight='100vh'>
            <form onSubmit={handleFormSubmit}>
              <SearchBox
                label='Search for a skill'
                skillsData={skillsData}
                searchResults={searchResults}
                setSearchResults={setSearchResults}
                setSkill={setSkill}
                setDisabledStatus={setDisabledStatus}
                setSkillsToAdd={setSkillsToAdd}
              />
              {!skill.found &&
                <Box>
                  <Alert severity="warning">
                    {skill.message} <Button onClick={handleAddSkill}>Add?</Button>
                  </Alert>
                </Box>
              }
              <Stack direction='row' spacing={2} mt={4}>
                <Button variant='contained' type='submit' disabled={disabledStatus}>Add to profile</Button>
                <Button variant='outlined' onClick={handleClose}>Close</Button>
              </Stack>
              {error.error && <Alert severity="error">{error.message}</Alert>}
            </form>
          </Box>
        </Box>
      </Modal>
    </>
  )
}