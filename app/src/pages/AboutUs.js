import { Typography } from "@material-ui/core";
import React from "react";
import NavBar from "../components/NavBar";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import MCard from "../components/MCard"

const navitem = [{ item: "AboutUs", link: "/AboutUs", id: 1 }];
const CardData = [
  {
    id: 1,
    img: "mubarak.jpg",
    title: "Mubarak Shah",
    details: "Project Manager & Backend Developer",
    link: "//pk.linkedin.com/in/syed-mubarak-shah-477a58230?trk=people-guest_people_search-card"
  },
  {
    id: 2,
    img: "taha.jpg",
    title: "Mohammad Taha",
    details: "Database Designer & SQA Engineer",
    link: "//pk.linkedin.com/in/mohammad-taha-28a827225?trk=public_profile_browsemap"
  },
  {
    id: 3,
    img: "sanjay.jpg",
    title: "Sanjay Kumar",
    details: "Front End Developer",
    link: "//pk.linkedin.com/in/sanjay-kumar-5947231a7?original_referer=https%3A%2F%2Fwww.google.com%2F"
  },
];


const useStyle = makeStyles((theme) => {
  return {
    containerSetting: {
      marginTop: theme.spacing(10),
      border: "2px solid pink",
    },
    container: {
      marginTop: theme.spacing(6)
    },
  };
});

const AboutUs = () => {
  const classes = useStyle();
  return (
    <>
      <NavBar navitem={navitem} />
      <Container className={classes.containerSetting}>
        <Typography
          variant="h2"
          style={{textAlign : "center", fontWeight: "bold", color: "blueviolet"}}
        >We are a team of Software Engineers_</Typography>
        <br />
        <Typography
          variant="body1"
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate,
          necessitatibus corrupti. Ex eius, eum quo magni asperiores nulla
          corrupti amet? Excepturi, pariatur! Nulla, magni obcaecati rerum amet
          alias autem beatae.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate,
          necessitatibus corrupti. Ex eius, eum quo magni asperiores nulla
          corrupti amet? Excepturi, pariatur! Nulla, magni obcaecati rerum amet
          alias autem beatae.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate,
          necessitatibus corrupti. Ex eius, eum quo magni asperiores nulla
          corrupti amet? Excepturi, pariatur! Nulla, magni obcaecati rerum amet
          alias autem beatae.
        </Typography>
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
     
    
    </>
  );
};

export default AboutUs;
