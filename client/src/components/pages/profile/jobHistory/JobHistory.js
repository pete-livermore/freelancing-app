import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import JobCard from '../../jobs/JobCard'


export default function JobHistory({ profileData }) {
  const completedJobs = profileData.jobs.filter(job => job.complete)
  return (
    <Paper sx={{ p: '20px', mr: '15px', minWidth: '400px', mb: '25px' }}>
      <Typography variant='h6' component='h2'>
        Job history
      </Typography>
      {completedJobs.length ?
        completedJobs.map(job => <JobCard job={job} image='true' widthMax={{ xs: '400px', md: '500px' }} cardHeight='440px' />)
        :
        <p>No completed jobs yet</p>
      }
    </Paper>
  )
}