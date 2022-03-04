import { Link } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import arrowLogo from '../../../assets/images/arrow.png'

const JobCard = ({ job }) => {
  return (
    <Card sx={{ maxWidth: 345, textAlign: 'center' }}>
      <Link to={`/jobs/${job.id}`} style={{ textDecoration: 'none', color: 'black' }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {job.name}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {job.category}
          </Typography>
          <CardMedia
            component="img"
            height="194"
            image={arrowLogo}
            alt="Company logo"
          />
          <Typography gutterBottom variant="h6" component="div">
            Company name
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {job.brief}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="medium">See full job listing</Button>
        </CardActions>
      </Link>
    </Card>
  )
}

export default JobCard