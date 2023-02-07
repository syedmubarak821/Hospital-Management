import React from "react";
import NavBar from "../components/NavBar";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Avatar, makeStyles } from "@material-ui/core";
import { TextField, Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL: "http://localhost:3001/",
});
const useStyles = makeStyles((theme) => {
  return {
    paperStyle: {
      padding: 20,
      height: "70vh",
      width: 480,
      margin: "20px auto",
    },
    avatarStyle: {
      backgroundColor: "#1bbd7e",
    },
    btnStyle: {
      marginTop: theme.spacing(5),
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

const LoginCard = (props) => {
  const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({
    userName: "",
    password: "",
  });
  const handleChange = (e) => {
    const value = e.target.value;
    setLoginDetails({
      ...loginDetails,
      [e.target.name]: value,
    });
  };

  const classes = useStyles();
  const handleSubmit = async (e) => {

    const {userName} = loginDetails;
    alert(userName);
     await api
      .post(`/${props.link}`, loginDetails)
      .then((response) => {
        if (response.status===200){
          alert(response.data);
          navigate(`../${props.page}`,{
            state: {
              userName : userName,
              show: true,
            }
          });
        }else {
          alert("Invalid User Name or Password");
        } 
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <Container className={classes.containerStyle}>
        <Grid>
          <Paper elevation={10} className={classes.paperStyle}>
            <Grid align="center">
              <Avatar className={classes.avatarStyle}></Avatar>
              <h2>{props.title}</h2>
            </Grid>
            <TextField
              className={classes.fieldstyle}
              variant="outlined"
              label="User Name"
              value={loginDetails.userName}
              name="userName"
              fullWidth
              onChange={handleChange}
            ></TextField>
            <TextField
              className={classes.fieldstyle}
              variant="outlined"
              type="password"
              value={loginDetails.password}
              name="password"
              label="Password"
              fullWidth
              onChange={handleChange}
              
            ></TextField>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              className={classes.btnStyle}
              onClick={handleSubmit}
              fullWidth
            >
              Sign in
            </Button>
            
          </Paper>
        </Grid>
      </Container>
    </div>
  );
};

export default LoginCard;
