import React, { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Autocomplete from '@mui/material/Autocomplete'
import { countries } from '../../../../helpers/countries'

export default function CountrySelector({ formValues, setFormValues }) {
  const [value, setValue] = useState(countries[229])
  const [inputValue, setInputValue] = useState('')

  return (
    <Grid item display='flex' mb={3} width='100%' pl={2} pr={4}>
      <Box pt='10px' minWidth='170px'>
        <label htmlFor='country-select'>
          <Typography>Country</Typography>
        </label>
      </Box>
      <Autocomplete
        name='country-select'
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          console.log(newInputValue)
          setInputValue(newInputValue)
          setFormValues({ ...formValues, country: newInputValue })
        }}
        id="country-select"
        options={countries}
        sx={{ width: '100%' }}
        renderInput={(params) => <TextField {...params} label="Select country" />}
      />
    </Grid>
  )
}


