import React from 'react'
import NavBar from "../components/NavBar";
import Banner from "../components/Banner";
import Typography from "@material-ui/core/Typography"
import {makeStyles} from "@material-ui/core"
import Grid from "@material-ui/core/Grid";
import MCard from "../components/MCard";

const navitem = [
  { item: "Register Users", link: "/RegisterUser", id: 2 },
  { item: "About Us", link: "/AboutUs", id: 4 },
  { item: "Logout", link: "/Login", id: 5 },
];

const CardData = [
  {
    id: 1,
    img: "admin.jpg",
    title: "Admin Register",
    details: "Administrator will monitor all Users",
    link: "/AdminRegister",
  },
  {
    id: 2,
    img: "doctorimg.jpg",
    title: "Doctor Register",
    details: "Doctor will treat Patient",
    link: "/DoctorRegister",
  },
  {
    id: 3,
    img: "Receptionist.jpeg",
    title: "Receptionist Register",
    details: "Receptionist will register, make bill for patient",
    link: "/ReceptionistRegister",
  },
  {
    id: 4,
    img: "pharmacist.jpg",
    title: "Pharmacist Register",
    details: "Pharmacist will handle Medicines",
    link: "/PharmaRegister",
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

const RegisterUser = () => {
    
  const classes = useStyle();
  const note = "Start thinking wellness not illness";
  return <>
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
  </>;
};

export default RegisterUser;
