import React from 'react'
import NavBar from "../components/NavBar";
import Banner from "../components/Banner";
import Typography from "@material-ui/core/Typography"
import {makeStyles} from "@material-ui/core"
import Grid from "@material-ui/core/Grid";
import MCard from "../components/MCard";


const navitem = [
  { item: "About us", link: "/AboutUs", id: 1 },
  { item: "Login", link: "/Login", id: 3 },
];

const CardData = [
  {
    id: 1,
    img: "admin.jpg",
    title: "Admin Login",
    details: "Administrator will monitor all Users",
    link: "/AdminLogin"
  },
  {
    id: 2,
    img: "doctorimg.jpg",
    title: "Doctor Login",
    details: "Doctor will treat Patient",
    link: "/DoctorLogin"
  },
  {
    id: 3,
    img: "Receptionist.jpeg",
    title: "Receptionist Login",
    details: "Receptionist will register, make bill for patient",
    link: "/ReceptionistLogin"
  },
  {
    id: 4,
    img: "pharmacist.jpg",
    title: "Pharmacist Login",
    details: "Pharmacist will handle Medicines",
    link: "/PharmaLogin"
  },
  
];


const useStyle = makeStyles((theme) => {
  return {
    heading: {
      marginTop: theme.spacing(3),
    },
    container: {
      marginTop: theme.spacing(6)
    },
    lrmargin: {
      marginLeft: theme.spacing(6),
      marginRight: theme.spacing(6)
    }
  };
});

const Login = () => {
  const classes = useStyle();
  const note = "Start thinking wellness not illness";

  return (
    <div>
       <NavBar navitem={navitem} />
       <Banner/>
       <Typography
        variant="h4"
        component="div"
        gutterBottom
        align="center"
        className={classes.heading}
      >
        {note}
      </Typography>
      {/* <Container> */}
      <div className={classes.lrmargin}>
      <Grid container spacing={1} className={classes.container}>
        {CardData.map((data) => {
          const { id, img, title, details,link } = data;
          return (
            <Grid item md={3}>
              <MCard key={id} image={img} title={title} details={details} link={link} />
            </Grid>
            );
        })}
        
      </Grid>
      </div>
      {/* </Container> */}
    </div>
  )
}

export default Login
