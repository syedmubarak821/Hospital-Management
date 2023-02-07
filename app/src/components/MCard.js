import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography'
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles({
  stylelink: {
    textDecoration: 'none',
    color: 'Black'
  }
})

const MCard = (props) => {
  const imageSource = props.image; 
  const linkto = props.link;
  const classes = useStyle();

  return (

    <>
    <Card>
      <CardMedia
      component="img"
      image={require("../images/"+imageSource)}
      height="300"
      alt="Image"
      />
      
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" align="center">
          <Link to={linkto} className={classes.stylelink}>{props.title}</Link>
        </Typography>
        
        <Typography variant="body" color="text.secondary" align="center" style={{fontWeight: "bold"}}>
          {props.details}
        </Typography>
      </CardContent>
    </Card>
    
    </>
  )
}

export default MCard
