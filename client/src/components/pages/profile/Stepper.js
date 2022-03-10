import React, { useState } from 'react'
import axios from 'axios'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Alert from '@mui/material/Alert'
import Grid from '@mui/material/Grid'
import { ImageUpload } from '../../../helpers/imageUpload'
import Select from 'react-select'


export default function HorizontalStepper({ formValues, handleImageUrl, steps, options, setFormValues, setIsLoading, sectors }) {
  const [activeStep, setActiveStep] = useState(0)
  const [skipped, setSkipped] = useState(new Set())
  const [imageUploading, setImageUploading] = useState(false)
  const [selectedSector, setSelectedSector] = useState({ name: '', id: '' })
  const [formErrors, setFormErrors] = useState()
  const [error, setError] = useState({ error: false, input: '', message: '' })
  const [allInputsFilled, setAllInputsField] = useState({})

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
          console.log(err)
        }
      }
      postData()
    }
  }
  console.log(formValues)

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
    setFormValues({ ...formValues, [e.target.name.replace(/\s+/g, '_').toLowerCase()]: e.target.value })
  }

  const handleMultiSelectChange = (selected, name) => {
    console.log(selected)
    const selectedItems = selected.map(obj => obj.value)
    setFormValues({ ...formValues, [name]: [...selectedItems] })
  }

  const handleOptionChange = (selected, name) => {
    console.log(selected)
    setFormValues({ ...formValues, [name]: [selected.value] })
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  const handleBlur = (e) => {
    if (!e.target.value) {
      setError({ error: true, input: e.target.name, message: 'input not filled' })
    }
  }



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
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <form>
            <Grid container alignItems="flex-start" justify="center" flexWrap='wrap' maxHeight='350px' direction="column" marginTop={4}>
              {steps[activeStep].fields.map(field => {
                return (
                  <Grid item key={field.text} display='flex' mb={2}>
                    <Box pt='10px' minWidth='150px' mr={4} ml={2}>
                      <label htmlFor={field.text.replace(/\s+/g, '_').toLowerCase()}>
                        <Typography>{field.text === 'Address' ? `First line of ${field.text.replace(/\s+/g, '_').toLowerCase()}` : field.text.replace(/\s+/g, ' ')}</Typography>
                      </label>
                    </Box>
                    <Box >
                      <TextField
                        onChange={handleInputChange}
                        className='stepper-input'
                        type={field.type}
                        name={field.text.replace(/\s+/g, '_').toLowerCase()}
                        placeholder={field.text === 'Address' ? `First line of ${field.text.replace(/\s+/g, '_').toLowerCase()}` : field.text.replace(/\s+/g, ' ')}
                        value={formValues[field.text]}
                        onBlur={handleBlur}
                        required
                      // focused
                      />
                    </Box>
                  </Grid>
                )
              })}
              {activeStep === 0 &&
                <Box mt={1} ml={2} mb={2} display='flex'>
                  <Box mr={2}>
                    <label htmlFor='profile_image'>
                      <Typography>Upload a profile picture</Typography>
                    </label>
                  </Box>
                  <ImageUpload
                    value={formValues.profile_image}
                    name='profile_image'
                    handleImageUrl={handleImageUrl}
                    setImageUploading={setImageUploading}
                  />
                </Box>
              }
              {activeStep === 2 &&
                <>
                  <Box pt='10px' minWidth='80px' mr={2}><label htmlFor='skills'><Typography>Sector</Typography></label>
                    <Select onChange={(selected) => handleOptionChange(selected, 'sector')} options={sectors} />
                  </Box>
                  <Box pt='10px' minWidth='80px' mr={2}><label htmlFor='skills'><Typography>Skills</Typography></label>
                    <Select onChange={(selected) => handleMultiSelectChange(selected, 'skills')} options={options} isMulti />
                  </Box>
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
            <Button disabled={error.error} onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  )
}