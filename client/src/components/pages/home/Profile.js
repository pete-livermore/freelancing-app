import Calendar from '../../Calendar'
import theme from '../../Theme'
import { ThemeProvider } from '@mui/material/styles'

const Profile = () => {
  return (
    <ThemeProvider theme={theme}>
      <Calendar />
    </ThemeProvider>
  )
}

export default Profile