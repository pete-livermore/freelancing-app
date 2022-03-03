import React, { useState } from 'react'
import axios from 'axios'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'

const Form = ({ formType }) => {
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
  console.log(usedFields)



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
  const [formErrors, setFormErrors] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })
  const [formSuccess, setFormSuccess] = useState(false)

  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
    console.log(e.target.name, e.target.value)
  }

  const navigate = useNavigate()

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const postData = async () => {
      try {
        await axios.post(`api/auth/${formType.toLowerCase()}/`, formValues)
        if (formType === 'Register') {
          // setFormType('Log in')
          setFormSuccess(true)
          setTimeout(() => {
            setFormSuccess(false)
          }, 2000)
        }
        else navigate('/profile')
      } catch (error) {
        console.log('error =>', error.message)
      }
    }
    postData()
  }

  // const handleCheckPasswords = () => {
  //   if (formValues.password && formValues.passwordConfirmation && formValues.password !== formValues.passwordConfirmation) {
  //     setFormErrors({ ...formErrors, passwordConfirmation: 'Passwords don\'t match' })
  //   }
  // }
  // handleCheckPasswords()

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


  return (
    <form onSubmit={handleFormSubmit}>
      {formSuccess && <Alert severity="success" sx={{ mb: '5px' }}>Registration successful! Now please log in</Alert>}
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
                id={`${field.name}-input`}
                name={field.name === 'passwordConfirmation' ? formatPwordConfirmSend(field.name) : field.name}
                label={field.name === 'passwordConfirmation' ? formatPwordConfirmDisplay(field.name) : capitalizeFirstLetter(field.name)}
                type={field.type}
                value={formValues[field.name]}
                onChange={handleInputChange}
                sx={{ width: '300px' }}
              />
              {/* {formErrors.passwordConfirmation !== '' && <Alert severity="error">{formErrors.passwordConfirmation}</Alert>} */}
            </Grid>
          )
        })}
        <Grid item>
          <Button type='submit'>Submit</Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default Form