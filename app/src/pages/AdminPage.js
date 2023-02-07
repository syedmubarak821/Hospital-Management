import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import NavBar from "../components/NavBar";
import Banner from "../components/Banner";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import MCard from "../components/MCard";
import {useLocation} from "react-router-dom"
import Note from '../components/Note'
import CardData from '../components/Data/CardData'

const navitem = [
  { item: "Register Users", link: "/RegisterUser", id: 2 },
  { item: "About Us", link: "/AboutUs", id: 3 },
  { item: "Logout", link: "", id: 5 },
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

const AdminPage = (props) => {
  const location = useLocation();
  const classes = useStyle();
 
  const [username,setUserName] = useState(location.state.userName);

  return (
    <>
      <NavBar navitem={navitem} />
      <Banner />
      <Typography
        variant="h6"
        component="div"
        gutterBottom
        align="center"
        className={classes.msg}
      > 
        {username +" "}
        logged in as ADMIN
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
  );
};

export default AdminPage;
