import React, { useEffect } from 'react'
import NavBar from "../components/NavBar";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import axios from "axios";
import { useState } from "react";

const api = axios.create({
  baseURL: "http://localhost:3001/",
});

const navitem = [
  { item: "About us", link: "/AboutUs", id: 1 },
  { item: "Login", link: "/Login", id: 3 },
];

const useStyle = makeStyles((theme) => {
  return {
    container: {
      margin: "auto",
      marginTop: theme.spacing(10),
      width: theme.spacing(120),
    },
    set: {
      margin: theme.spacing(5),
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(2),
    },
    buttonStyle: {
      display: "block",
      marginTop: "50px",
      width: theme.spacing(60),
    },
    paperstyling: {},
    formstyling: {
      padding: theme.spacing(10),
      // height: "100vh",
    },
    head: {
      position: "relative",
      top: 50,
    },
    avatar: {
      backgroundColor: "#0c6a7f",
      width: theme.spacing(40),
    },
  };
});

const AdminRegister = () => {
  const classes = useStyle();
  const [adminDetails, setAdminDetails] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: null,
    mobileNumber: null,
    street: "",
    city: "",
    pinCode: null,
    password: null,
  });
  const handleChange = (e) => {
    const value = e.target.value;
    setAdminDetails({
      ...adminDetails,
      [e.target.name]: value,
    });
  };
  const handleSubmit = async (e) => {
      console.log(adminDetails);
     await api.post("/create_admin", adminDetails).then((response) => {
      console.log(response.status);
      console.log(response.data);
    }).catch(err => console.log(err));

    console.log('here');
  };
  return (
    <div>
      <NavBar navitem={navitem} />
      <Container className={classes.container} align="center">
        <Grid>
          <Paper elevation={10} className={classes.paperstyling}>
            <Grid className={classes.head}>
              <div className={classes.flexcontainer}>
                <Avatar className={classes.avatar} variant="square">
                  Admin Register
                </Avatar>
              </div>
            </Grid>
            <form autoComplete="off" className={classes.formstyling}>
              <TextField
                className={classes.set}
                variant="outlined"
                label="First Name"
                value={adminDetails.firstName}
                name="firstName"
                onChange={handleChange}
                required
              ></TextField>
              <TextField
                className={classes.set}
                variant="outlined"
                label="Last Name"
                value={adminDetails.lastName}
                name="lastName"
                onChange={handleChange}
                required
              ></TextField>
              <TextField
                className={classes.set}
                variant="outlined"
                label="User Name"
                value={adminDetails.userName}
                name="userName"
                onChange={handleChange}
                required
              ></TextField>
              <TextField
                className={classes.set}
                type="email"
                variant="outlined"
                label="Email"
                value={adminDetails.email}
                name="email"
                onChange={handleChange}
                required
              ></TextField>
              <TextField
                className={classes.set}
                type="number"
                variant="outlined"
                label="Mobile Number"
                value={adminDetails.mobileNumber}
                name="mobileNumber"
                onChange={handleChange}
                required
              ></TextField>
              <TextField
                className={classes.set}
                variant="outlined"
                label="Street"
                value={adminDetails.street}
                name="street"
                onChange={handleChange}
                required
              ></TextField>
              <TextField
                className={classes.set}
                variant="outlined"
                label="City"
                value={adminDetails.city}
                name="city"
                onChange={handleChange}
                required
              ></TextField>
              <TextField
                className={classes.set}
                type="number"
                variant="outlined"
                label="Pin Code"
                value={adminDetails.pinCode}
                name="pinCode"
                onChange={handleChange}
                required
              ></TextField>
              <TextField
                className={classes.set}
                type="password"
                variant="outlined"
                label="Password"
                value={adminDetails.password}
                name="password"
                onChange={handleChange}
                required
              ></TextField>
              <Button
                className={classes.buttonStyle}
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Register
              </Button>
            </form>
          </Paper>
        </Grid>
      </Container>
    </div>
  );
};

export default AdminRegister;
