import React, { useState } from 'react'
import axios from 'axios'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import { pink } from '@mui/material/colors'
import { alpha, styled } from '@mui/material/styles'

const Form = ({ formType, setIsFlipped, isFlipped, setSelectedPage }) => {
  const [isFreelancer, setIsFreelancer] = useState(true)
  const [isClient, setIsClient] = useState(false)


  // Setting form fields
  const availablefields = [{
    name: 'username',
    type: 'text'
  },
  {
    name: 'email',
    type: 'email'
  },
  {
    name: 'password',
    type: 'password'
  },
  {
    name: 'passwordConfirmation',
    type: 'password'
  }]


  let usedFields
  if (formType === 'Register') usedFields = availablefields
  else {
    const sliced = availablefields.slice(0, 3)
    usedFields = sliced
  }

  // Setting form values
  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    is_freelancer: isFreelancer,
    is_client: isClient
  })

  // Setting form errors
  const [formError, setFormError] = useState({
    error: false,
    detail: ''
  })
  const [formSuccess, setFormSuccess] = useState(false)

  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const navigate = useNavigate()

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const postData = async () => {
      try {
        const { data } = await axios.post(`api/auth/${formType.toLowerCase().replace(/\s/g, "")}/`, formValues)
        if (formType === 'Register') {
          setIsFlipped(true)
          setFormSuccess(true)
          setTimeout(() => {
            setFormSuccess(false)
          }, 2000)
        }
        else {
          window.localStorage.setItem('outsourcd-token', data.token)
          navigate('/profile')
        }
      } catch (err) {
        setFormError({ error: true, detail: err.response.data.detail })
        setTimeout(() => {
          setFormError({ error: false, detail: '' })
        }, 3000)
      }
    }
    postData()
  }

  const handleCheckPasswords = () => {
    if (formValues.password && formValues.password_confirmation && formValues.password !== formValues.password_confirmation) {
      setFormError({ error: true, detail: 'Passwords don\'t match' })
    }
    setTimeout(() => {
      setFormError({ error: false, detail: '' })
    }, 3000)
  }


  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const formatPwordConfirmDisplay = (string) => {
    const newString = string.charAt(0).toUpperCase() + string.slice(1)
    return newString.slice(0, 8) + ' ' + newString.slice(8).toLowerCase()
  }

  const formatPwordConfirmSend = (string) => {
    return string.slice(0, 8) + '_' + string.slice(8).toLowerCase()
  }

  const handleButtonClick = () => {
    setIsFlipped(true)
  }

  // const handleSwitchChange = (e) => {
  //   setIsClient(e.target.checked)
  // }

  // const PinkSwitch = styled(Switch)(({ theme }) => ({
  //   '& .MuiSwitch-switchBase.Mui-checked': {
  //     color: pink[600],
  //     '&:hover': {
  //       backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
  //     },
  //   },
  //   '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
  //     backgroundColor: pink[600],
  //   },
  // }))


  return (
    <form onSubmit={handleFormSubmit}>
      {/* {formSuccess && <Alert severity="success" sx={{ mb: '5px' }}>Registration successful! Now please log in</Alert>} */}
      <Typography variant="h4" component="h2" align='center' sx={{ mb: '15px' }}>
        {formType}
      </Typography>
      <Typography component="div" align='center' sx={{ marginBottom: '20px' }}>
        A call to action here
      </Typography>
      <Grid container alignItems="center" justify="center" direction="column">
        {usedFields.length && usedFields.map((field, i) => {
          return (
            <Grid item key={i} sx={{ marginBottom: '12px' }}>
              <TextField
                id={`${formType}-${field.name}-input`}
                key={field.name}
                name={field.name === 'passwordConfirmation' ? formatPwordConfirmSend(field.name) : field.name}
                label={field.name === 'passwordConfirmation' ? formatPwordConfirmDisplay(field.name) : capitalizeFirstLetter(field.name)}
                type={field.type}
                value={formValues[field.name]}
                onChange={handleInputChange}
                onBlur={handleCheckPasswords}
                sx={{ width: '300px' }}
              />
            </Grid>
          )
        })}
        {/* <Grid item>
          {formType === 'Register' &&
            <FormControlLabel
              control={<PinkSwitch checked={isClient} onChange={handleSwitchChange} />}
              label={`${isClient ? "I'm looking for jobs" : "I'm looking for a freelancer"}`} />
          }
        </Grid> */}
        <Grid item>
          <Button sx={{ mt: 2 }} variant='contained' type='submit'>Submit</Button>
        </Grid>
      </Grid>
      <Grid item>
        {formError.error && <Alert severity="error">{formError.detail}</Alert>}
      </Grid>
      {formType === 'Register' &&
        <Grid display='flex' flexDirection='column' alignItems='center' mt={4}>
          <Typography align='center'>Already have an account?</Typography>
          <Button variant='outlined' sx={{ textAlign: 'center', mt: 2 }} onClick={handleButtonClick}>Log in instead</Button>
        </Grid>
      }
    </form>
  )
}

export default Form