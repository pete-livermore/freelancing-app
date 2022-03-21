import React, { useState } from 'react'
import axios from 'axios'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import Select from '@mui/material/Select'
import Grid from '@mui/material/Grid'
import { ImageUpload } from '../../../../helpers/imageUpload'
import MultiSelect from './MultiSelector'
import CountrySelector from './CountrySelector'
import InputAdornment from '@mui/material/InputAdornment'


export default function HorizontalStepper({ formValues, handleImageUrl, skills, setFormValues, setIsLoading, sectors }) {
  const [activeStep, setActiveStep] = useState(0)
  const [skipped, setSkipped] = useState(new Set())
  const [imageUploading, setImageUploading] = useState(false)
  const [error, setError] = useState({ error: false, message: '' })
  const [imageUploaded, setImageUploaded] = useState(false)
  const steps = [{
    text: 'Personal details',
    fields: [
      { text: 'First name', type: 'text' },
      { text: 'Last name', type: 'text' },
      { text: 'Address', type: 'text' },
      { text: 'City', type: 'text' },
      { text: 'Postcode', type: 'text' }
    ]
  },
  {
    text: 'Business information',
    fields: [{ text: 'Business name', type: 'text' }, { text: 'Business website', type: 'url' },]
  },
  {
    text: 'About your work',
    fields: [{ text: 'About you', type: 'text' }, { text: 'Job title', type: 'text' }, { text: 'Personal website', type: 'url' }, { text: 'LinkedIn profile', type: 'url' }]
  }]


  const isStepOptional = (step) => {
    return step === 1
  }

  const isStepSkipped = (step) => {
    return skipped.has(step)
  }

  const handleNext = () => {
    let newSkipped = skipped
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values())
      newSkipped.delete(activeStep)
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setSkipped(newSkipped)
    if (activeStep === steps.length - 1) {
      const postData = async () => {
        try {
          const token = localStorage.getItem('outsourcd-token')
          await axios.put('/api/profiles/profile/', formValues,
            {
              'headers': {
                'Authorization': 'Bearer ' + token
              }
            })
          setIsLoading(true)
        } catch (err) {
          setError({ error: true, message: err.message })
        }
      }
      postData()
    }
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.")
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values())
      newSkipped.add(activeStep)
      return newSkipped
    })
  }

  const handleInputChange = (e) => {
    if (e.target.name === 'about_you') setFormValues({ ...formValues, about_me: e.target.value })
    else if (e.target.name === 'linkedin_profile') setFormValues({ ...formValues, linkedin_url: `https://${e.target.value}` })
    else if (e.target.name === 'business_website' || e.target.name === 'personal_website') setFormValues({ ...formValues, [e.target.name]: `https://${e.target.value}` })
    else setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleOptionChange = (e) => {
    const newSectors = [...sectors]
    const filteredSectors = newSectors.filter(sector => e.target.value === sector.name).map(sector => sector.id)
    setFormValues({ ...formValues, sector: filteredSectors })
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  let filledInputs
  if (steps && steps.length && activeStep === 2) filledInputs = steps[activeStep].fields.map(field => field.text.replace(/\s+/g, '_').toLowerCase()).map(input => formValues[input]).some(str => !str)
  else if (activeStep === 0 || activeStep === 1) filledInputs = steps[activeStep].fields.map(field => field.text.replace(/\s+/g, '_').toLowerCase()).map(input => formValues[input]).every(str => str)

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, i) => {
          const stepProps = {}
          const labelProps = {}
          if (isStepOptional(i)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            )
          }
          if (isStepSkipped(i)) {
            stepProps.completed = false
          }
          return (
            <Step key={label.text} {...stepProps}>
              <StepLabel {...labelProps}>{label.text}</StepLabel>
            </Step>
          )
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            {/* <Button variant='contained' onClick={handleNavigate}>Reset</Button> */}
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <form>
            <Grid container alignItems="stretch" justify="center" flexWrap='wrap' maxHeight={{ xs: '600px', md: '350px' }} direction="column" marginTop={4} width={{ xs: '100%', md: '50%' }}>
              {steps[activeStep].fields.map(field => {
                return (
                  <Grid item key={field.text} display='flex' mb={3} width='100%' pl={2} pr={4} md={4}>
                    <Box pt='10px' minWidth='170px'>
                      <label htmlFor={field.text.replace(/\s+/g, '_').toLowerCase()}>
                        <Typography>{field.text === 'Address' ? `First line of ${field.text.replace(/\s+/g, '_').toLowerCase()}` : field.text.replace(/\s+/g, ' ')}</Typography>
                      </label>
                    </Box>
                    <Box flexGrow={1} >
                      <TextField
                        sx={{ width: '100%' }}
                        onChange={handleInputChange}
                        className='stepper-input'
                        type={field.type}
                        name={field.text.replace(/\s+/g, '_').toLowerCase()}
                        placeholder={field.type === 'url' ? 'examplewebsite.com' : field.text.replace(/\s+/g, ' ')}
                        value={formValues[field.text]}
                        required
                        inputProps={{ maxLength: 500, }}
                        InputProps={{ startAdornment: field.type === 'url' ? <InputAdornment position="start">https://</InputAdornment> : '' }}
                      // focused
                      />
                    </Box>
                  </Grid>
                )
              })}
              {activeStep === 0 &&
                <>
                  <CountrySelector formValues={formValues} setFormValues={setFormValues} />
                  <Grid item mt={1} ml={2} mb={2} display='flex'>
                    <Box mr={2}>
                      <label htmlFor='profile_image'>
                        <Typography>Upload a profile picture</Typography>
                      </label>
                    </Box>
                    {imageUploading ?
                      <CircularProgress sx={{ ml: 2 }} />
                      :
                      imageUploaded ?
                        <Alert sx={{ width: '195px' }} severity="success">Image uploaded!</Alert>
                        :
                        <ImageUpload
                          value={formValues.profile_image}
                          name='profile_image'
                          handleImageUrl={handleImageUrl}
                          setImageUploading={setImageUploading}
                          setImageUploaded={setImageUploaded}
                        />
                    }
                  </Grid>
                </>
              }
              {activeStep === 2 &&
                <>
                  <FormControl fullWidth>
                    <InputLabel id="sector">Sector</InputLabel>
                    <Select
                      labelId="sector"
                      id="sector-selecter"
                      value={formValues.sectors}
                      label="Sector"
                      onChange={handleOptionChange}
                    >
                      {sectors.map(sector => <MenuItem key={sector.id} value={sector.name}>{sector.name}</MenuItem>)}
                    </Select>
                  </FormControl>
                  <MultiSelect skills={skills} formValues={formValues} setFormValues={setFormValues} />
                </>
              }
              {error.error && <Alert severity="error" sx={{ mt: 2 }}>
                {`${error.input} ${error.message}`}
              </Alert>
              }
            </Grid>
          </form>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
            <Button disabled={filledInputs && imageUploaded ? false : true} onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  )
}