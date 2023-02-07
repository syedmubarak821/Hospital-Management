import React, {useState} from 'react'
import NavBar from '../components/NavBar'
import Banner from '../components/Banner'
import Typography from '@material-ui/core/Typography'
import {useLocation} from "react-router-dom"
import { makeStyles } from '@material-ui/core'
import Note from '../components/Note'
import CardData from '../components/Data/CardData'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import MCard from '../components/MCard'

const navitem = [
    { item: "View My Patients", link: "/ViewPatient", id: 1 },
    { item: "About Us", link: "/AboutUs", id: 2 },
    { item: "Logout", link: "/Login", id: 4 },
  ];

const useStyle = makeStyles((theme) => {
    return {

      heading: {
        marginTop: theme.spacing(3),
      },
      container: {
        marginTop: theme.spacing(6),
      },
      msg: {
          backgroundColor: '#B6FFCE'
      }
    };
  });  

const DoctorPage = () => {
    const location = useLocation();
    const classes = useStyle();
   
    const [username,setUserName] = useState(location.state.userName);
    localStorage.setItem("name",username);
  return (
    <>
    <NavBar navitem={navitem} />
    <Banner/>
    <Typography
        variant="h6"
        component="div"
        gutterBottom
        align="center"
        className={classes.msg}
      > 
        {username +" "}
        logged in as Doctor
      </Typography>
      <Note/>
      <Container>
        <Grid container spacing={4} className={classes.container}>
          {CardData.map((data) => {
            const { id, img, title, details, link } = data;

            return (
              <Grid item md={4}>
                <MCard
                  key={id}
                  image={img}
                  title={title}
                  details={details}
                  link={link}
                />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  )
}

export default DoctorPage
