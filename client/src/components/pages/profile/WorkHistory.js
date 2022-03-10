import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'

export default function WorkHistory() {

  return (
    <Paper sx={{ p: '20px', mr: '15px', minWidth: '400px', mb: '25px' }}>
      <Typography variant='h6' component='h2'>
        Job history
      </Typography>
      <Card>
        This is a job
      </Card>
    </Paper>
  )
}