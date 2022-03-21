import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import JobCard from '../../jobs/JobCard'


export default function JobHistory({ profileData }) {
  const completedJobs = profileData.jobs.filter(job => job.complete)
  return (
    <Paper sx={{ p: 4, mr: 2, minWidth: '400px', mb: 4 }}>
      <Typography variant='h6' component='h2'>
        Job history
      </Typography>
      {completedJobs.length ?
        completedJobs.map(job => <JobCard key={job.id} job={job} image='true' widthMax={{ xs: '400px', md: '500px' }} cardHeight='440px' />)
        :
        <p>No completed jobs yet</p>
      }
    </Paper>
  )
}