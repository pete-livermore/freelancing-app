import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const Form = ({ formType }) => {
  const [usedFields, setUsedFields] = useState([])
  const [formErrors, setFormErrors] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })
  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })

  const handleInputChange = (e) => {
    console.log(e.target.value)
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    console.log(e.target.value)
  }

  const handleCheckPasswords = () => {
    if (formValues.password && formValues.passwordConfirmation && formValues.password !== formValues.passwordConfirmation) {
      setFormErrors({ ...formErrors, passwordConfirmation: 'Passwords don\'t match' })
    }
  }
  handleCheckPasswords()

  useEffect(() => {
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
    if (formType === 'Register') setUsedFields(availablefields)
    else {
      const spliced = availablefields.splice(0, 3)
      setUsedFields(spliced)
    }
  }, [formType])

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const formatPasswordConfirmation = (string) => {
    const newString = string.charAt(0).toUpperCase() + string.slice(1)
    return newString.slice(0, 8) + ' ' + newString.slice(8)
  }


  return (
    <Box display='flex' justifyContent='center' alignItems='center'>
      <Box bgcolor='white' p={6} maxWidth='500px' borderRadius={2} mt={4}>
        <form onSubmit={handleFormSubmit}>
          <Typography variant="h4" component="h2" align='center' sx={{ marginBottom: '15px' }}>
            {formType}
          </Typography>
          <Typography component="div" align='center' sx={{ marginBottom: '20px' }}>
            A call to action here
          </Typography>
          <Grid container alignItems="center" justify="center" direction="column">
            {usedFields.length && usedFields.map(field => {
              return (
                <>
                  <Grid item sx={{ marginBottom: '12px' }}>
                    <TextField
                      id={`${field.name}-input`}
                      name={field.name}
                      label={field.name === 'passwordConfirmation' ? formatPasswordConfirmation(field.name) : capitalizeFirstLetter(field.name)}
                      type={field.type}
                      value={formValues[field.name]}
                      onChange={handleInputChange}
                      sx={{ width: '300px' }}
                    />
                    {formErrors.passwordConfirmation !== '' && <Alert severity="error">{formErrors.passwordConfirmation}</Alert>}
                  </Grid>
                </>
              )
            })}
            <Grid item>
              <Button>Submit</Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  )
}

export default Form