import React, {useState} from 'react'
import NavBar from '../components/NavBar'
import Banner from '../components/Banner'
import Note from '../components/Note'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import CardData from '../components/Data/CardData'
import MCard from '../components/MCard'
import {useLocation} from "react-router-dom"
import Typography from '@material-ui/core/Typography'
import { makeStyles } from "@material-ui/core";

const navitem = [
  { item: "Add Medicine", link: "/AddMedicine", id: 1 },
  { item: "Add Company", link: "/AddCompany", id: 2 },
  { item: "Add Distributor", link: "/AddDistributor", id: 3 },
  { item: "About Us", link: "/AboutUs", id: 4 },
  { item: "Logout", link: "/Login", id: 6 },
];

const useStyle = makeStyles((theme) => {
  return {
    container: {
      marginTop: theme.spacing(6)
    },
    msg: {
      backgroundColor: '#B6FFCE'
  }
  };
});

const PharmaPage = () => {
  
    const location = useLocation();
  const classes = useStyle();
  const [username,setUserName] = useState(location.state.userName);
  
  return (
    <div>
      <NavBar navitem={navitem}/>
      <Banner/>
      <Typography
        variant="h6"
        component="div"
        gutterBottom
        align="center"
        className={classes.msg}
      > 
        {username +" "}
        logged in as Pharmacist
      </Typography>
      <Note/>
      <Container>
      <Grid container spacing={4} className={classes.container}>
        {CardData.map((data) => {
          const { id, img, title, details,link} = data;

          return (
            <Grid item md={4}>
              <MCard key={id} image={img} title={title} details={details} link={link}/>
            </Grid>
            );
        })}
      </Grid>
      </Container>
    </div>
  )
}

export default PharmaPage
