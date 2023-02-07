import { makeStyles } from '@material-ui/core';
import React from 'react'
import NavBar from '../components/NavBar';
import Carousel from 'react-material-ui-carousel'


const useStyle = makeStyles((theme)=>{
  return({
    bannerHeight: {
      marginTop: '50px'
    },
    imgheight: {
      height: theme.spacing(30),
      // width: theme.spacing(213.5),
      width: '100%'
    },
    carouselHeight: {
      height: theme.spacing(35),
    }
  })
})


const Banner = () => {
  const classes = useStyle();
  return (
    <div className={classes.banenerHeight}>
      <Carousel className={classes.carouselHeight}>   
        <img src={require('../images/csecond.jpg')} alt="slider_image" className={classes.imgheight}/>
        <img src={require('../images/cthird.jpg')} alt="slider_image" className={classes.imgheight}/>
        <img src={require('../images/cfirst.jpg')} alt="slider_image" className={classes.imgheight}/>
      </Carousel>
    </div>
  )
}

export default Banner