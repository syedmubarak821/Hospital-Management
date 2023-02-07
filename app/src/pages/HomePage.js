import React from "react";
import NavBar from "../components/NavBar";
import Banner from "../components/Banner";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import MCard from "../components/MCard";
import CardData from "../components/Data/CardData"

const navitem = [
  { item: "About us", link: "/AboutUs", id: 1 },
  { item: "Login", link: "/Login", id: 3 },
];



const useStyle = makeStyles((theme) => {
  return {
    heading: {
      marginTop: theme.spacing(3),
    },
    container: {
      marginTop: theme.spacing(6)
    },
  };
});

const HomePage = () => {
  const classes = useStyle();
  const note = "Start thinking wellness not illness";
  return (
    <div>
      <NavBar navitem={navitem} />
      <Banner />
      <Typography
        variant="h4"
        component="div"
        gutterBottom
        align="center"
        className={classes.heading}
      >
        {note}
      </Typography>
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
  );
};

export default HomePage;
