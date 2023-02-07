import React from "react";
import NavBar from "../components/NavBar";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import axios from "axios";
import { useState } from "react";
import InputField from "../components/Fields/InputField";
import Dropdown from "../components/Fields/Dropdown";

const api = axios.create({
  baseURL: "http://localhost:3001/",
});


const navitem = [
  { item: "Register Users", link: "/RegisterUser", id: 2 },
  { item: "About Us", link: "/AboutUs", id: 3 },
  { item: "Logout", link: "/Login", id: 5 },
];

const useStyle = makeStyles((theme) => {
  return {
    container: {
      margin: "auto",
      marginTop: theme.spacing(10),
      width: theme.spacing(100),
    },
    avatar: {
      backgroundColor: "#78938A",
      width: theme.spacing(40),
      padding: theme.spacing(4),
    },
    temp: {
      height: "20px",
    },
    formstyling: {
      padding: theme.spacing(3),
    },
    buttonStyle: {
      display: "block",
      marginTop: "50px",
      width: theme.spacing(60),
    },
    
  };
});

const PharmaRegister = (props) => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    age: null,
    mobile: null,
    street: "",
    city: "",
    pinCode: null,
    password: "",
    regDate: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setValues({
      ...values,
      [e.target.name]: value,
    });
  };
  const handleSubmit = async(e)=>{
    console.log(values);
    await api.post("/create_pharmacist", values).then((response) => {
     console.log(response.status);
     console.log(response.data);
   }).catch(err => console.log(err));

   console.log('here');
  }
  const classes = useStyle();
  return (
    <>
      <NavBar navitem={navitem} />
      <Container className={classes.container} align="center">
        <Grid>
          <Paper elevation={10} className={classes.pstyle}>
            <Grid>
              <div className={classes.temp}></div>
              <div className={classes.head}>
                <Avatar className={classes.avatar} variant="square">
                  Pharmacist Registration
                </Avatar>
              </div>
            </Grid>
            <form autoComplete="off" className={classes.formstyling}>
              <InputField
                value={values.firstName}
                type="text"
                name="firstName"
                placeholder="Enter first name"
                onChange={handleChange}
              />
              <InputField
                value={values.lastName}
                type="text"
                name="lastName"
                placeholder="Enter last name"
                onChange={handleChange}
              />
              <InputField
                value={values.userName}
                type="text"
                name="userName"
                placeholder="Enter user name"
                onChange={handleChange}
              />
              <InputField
                value={values.email}
                type="email"
                name="email"
                placeholder="Enter email id"
                onChange={handleChange}
              />
              <InputField
                value={values.age}
                type="number"
                name="age"
                placeholder="Enter Age"
                onChange={handleChange}
              />

              <InputField
                value={values.mobile}
                type="number"
                name="mobile"
                placeholder="Enter Mobile no."
                onChange={handleChange}
              />
              <InputField
                value={values.street}
                type="text"
                name="street"
                placeholder="Enter Street"
                onChange={handleChange}
              />
              <InputField
                value={values.city}
                type="text"
                name="city"
                placeholder="Enter City"
                onChange={handleChange}
              />
              <InputField
                value={values.pinCode}
                type="number"
                name="pinCode"
                placeholder="Enter pin Code"
                onChange={handleChange}
              />

              <InputField
                value={values.password}
                type="password"
                name="password"
                placeholder="Enter Password"
                onChange={handleChange}
              />

              <InputField
                value={values.regDate}
                type="date"
                name="regDate"
                onChange={handleChange}
                iclass="shiftLeft"
              />

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
    </>
  );
};

export default PharmaRegister;
