import { Link } from 'react-router-dom'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

export default function JobCard({ job, image, widthMax, cardHeight }) {
  return (
    <Box width={widthMax} minWidth={400}>
      <Link to={`/jobs/${job.id}`} style={{ textDecoration: 'none', color: 'black', width: '100%' }}>
        <Card sx={{ width: '100%', height: cardHeight, textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {job.name}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              {job.category}
            </Typography>
            {image ? <CardMedia
              component="img"
              height="194"
              src={job.company.logo}
              alt="Company logo"
            /> :
              ''
            }
            <Typography gutterBottom variant="h6" component="div">
              {job.company.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`${job.brief.substring(0, 90)}...`}
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained" size="medium" sx={{ marginX: 'auto', mb: '10px' }} >See full job listing</Button>
          </CardActions>
        </Card>
      </Link>
    </Box>
  )
}