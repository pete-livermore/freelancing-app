import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Alert from '@mui/material/Alert'
import SearchBox from '../search/SearchBox'

export default function SkillsModal() {
  const [skillsData, setSkillsData] = useState([])
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [skill, setSkill] = useState([])
  const [isError, setIsError] = useState({ errror: false, message: ' ' })

  useEffect(() => {
    const getSkills = async () => {
      try {
        const { data } = await axios.get('api/profiles/skills/')
        setSkillsData(data)
      } catch (err) {
        console.log(err)
      }
    }
    getSkills()
  }, [])

  const handleInputChange = (e) => {
    setSkill(e.target.value)
  }
  const handleFormSubmit = (e) => {
    e.preventDefault()

    const addSkill = async () => {
      const token = localStorage.getItem('outsourcd-token')
      const dataToSend = { 'name': skill }
      console.log(dataToSend)
      try {
        await axios.post('/api/profiles/skills/', dataToSend,
          {
            'headers': {
              'Authorization': 'Bearer ' + token
            }
          })
      } catch (error) {
        setIsError({
          error: true,
          message: error.response.data.name[0]
        })
      }
    }
    addSkill()
  }

  return (
    <div>
      <Button onClick={handleOpen}>Add skills</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box display='flex' justifyContent='center' alignItems='center' height='100vh'>
          <Box backgroundColor='white' p={6} borderRadius={2} width='600px' boxShadow={24} maxHeight='100vh'>
            <form onSubmit={handleFormSubmit}>
              <SearchBox label='Search for a skill' searchedData={skillsData} />
              <TextField
                onChange={handleInputChange}
                value={skill}
                sx={{ width: '100%', mt: '10px' }}
                id="input-field"
                label='Add a new skill'
                type="text"
              />
              <Stack direction='row' spacing={2} mt={4}>
                <Button type='submit'>Submit</Button>
                <Button onClick={handleClose}>Close</Button>
              </Stack>
              {isError.error && <Alert severity="error">{isError.message}</Alert>}
            </form>
          </Box>
        </Box>
      </Modal>
    </div >
  )
}