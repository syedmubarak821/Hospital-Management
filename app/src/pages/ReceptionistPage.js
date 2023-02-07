import React, {useState} from 'react'
import NavBar from '../components/NavBar'
import Banner from '../components/Banner'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import {makeStyles} from '@material-ui/core'
import {useLocation} from "react-router-dom"
import Note from '../components/Note'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import MCard from '../components/MCard'
import CardData from '../components/Data/CardData'
import { useHistory } from "react-router-dom";

const navitem = [
  { item: "Make Bill", link: "/MakeBill", id: 1 },
  { item: "Add Appointment", link: "/AddAppointment", id: 2 },
  { item: "About us", link: "/AboutUs", id: 3 },
  { item: "Register Patient", link: "/RegisterPatient", id: 5 },
  { item: "Logout", link: "/Login", id: 6 },
];

const useStyle = makeStyles((theme)=>{
  return ({
    msg : {
      backgroundColor: '#B6FFCE',
    }
  })
})
const ReceptionistPage = props => {
  
  const location = useLocation();
  const classes = useStyle();
  
  const [username,setUserName] = useState(null);
 

  return (
    <>
      <NavBar navitem={navitem} />
      <Banner/>
      {(location.state.show===true)? <Typography
        variant="h6"
        component="div"
        gutterBottom
        align="center"
        className={classes.msg}
      > 
        {(username===null) ? setUserName(location.state.userName): null} 
        {username} is logged in as Receptionist
      </Typography>: null}


      
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


export default ReceptionistPage
