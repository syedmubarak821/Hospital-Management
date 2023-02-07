import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { Avatar, makeStyles } from "@material-ui/core";
import InputField from "../components/Fields/InputField";
import Button from "@material-ui/core/Button";
import { api } from "../components/Data/axiosv";

const navitem = [
  { item: "Add Medicine", link: "/AddMedicine", id: 1 },
  { item: "Add Company", link: "/AddCompany", id: 2 },
  { item: "Add Distributor", link: "/AddDistributor", id: 3 },
  { item: "About Us", link: "/AboutUs", id: 4 },
  { item: "Logout", link: "", id: 5 },
];

const useStyles = makeStyles((theme) => {
  return {
    paperStyle: {
      padding: 20,
      width: 600,
      margin: "20px auto",
    },
    avatarStyle: {
      backgroundColor: "#1bbd7e",
    },
    btnStyle: {
      display: "block",
      marginTop: theme.spacing(5),
      marginLeft: theme.spacing(25),
    },
    fieldstyle: {
      marginTop: theme.spacing(3),
    },
    link: {
      textDecoration: "none",
    },
    containerStyle: {
      marginTop: theme.spacing(10),
    },
  };
});

const AddDistributor = () => {
  const handleSubmit = async () => {
    await api
      .post("/add_distributor", values)
      .then((response) => {
        if (response.status === 200) {
          alert("Distributor Get Registered");
        }else {
          alert("Not Registered");
        }
      })
      .catch((err) => console.log(err));
      console.log("here");
  };
  const [values, setValues] = useState({
    name: null,
    email: null,
    mobileNumber: null,
    street: null,
    city: null,
    pinCode: null,
    regDate: null,
  });
  const handleChange = (e) => {
    const value = e.target.value;
    setValues({ ...values, [e.target.name]: value });
  };
  const classes = useStyles();
  return (
    <>
      <NavBar navitem={navitem} />
      <Container className={classes.containerStyle}>
        <Grid>
          <Paper elevation={10} className={classes.paperStyle}>
            <Grid align="center">
              <Avatar className={classes.avatarStyle}></Avatar>
              <Typography variant="h6">
                Register Medicine Distributor
              </Typography>
            </Grid>
            <InputField
              value={values.name}
              type="text"
              name="name"
              label="Enter Name"
              onChange={handleChange}
            />
            <InputField
              value={values.email}
              type="email"
              name="email"
              label="Enter email"
              onChange={handleChange}
            />
            <InputField
              value={values.mobileNumber}
              type="number"
              name="mobileNumber"
              label="Enter Mobile Number"
              onChange={handleChange}
            />
            <InputField
              value={values.street}
              type="text"
              name="street"
              label="Enter Street"
              onChange={handleChange}
            />
            <InputField
              value={values.city}
              type="text"
              name="city"
              label="Enter City"
              onChange={handleChange}
            />
            <InputField
              value={values.pinCode}
              type="number"
              name="pinCode"
              label="Enter Pin Code"
              onChange={handleChange}
            />
            <InputField
              value={values.regDate}
              type="date"
              name="regDate"
              label="Enter Reg Date"
              onChange={handleChange}
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              className={classes.btnStyle}
              onClick={handleSubmit}
            >
              Register Distributor
            </Button>
          </Paper>
        </Grid>
      </Container>
    </>
  );
};

export default AddDistributor;
