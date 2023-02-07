import React, {useState} from "react";
import NavBar from "../components/NavBar";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import InputField from "../components/Fields/InputField";
import Dropdown from "../components/Fields/Dropdown"
import Button from "@material-ui/core/Button"
import { useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL: "http://localhost:3001/",
});


const navitem = [
  { item: "Make Bill", link: "/MakeBill", id: 1 },
  { item: "Add Appointment", link: "/AddAppointment", id: 2 },
  { item: "About us", link: "/AboutUs", id: 3 },
  { item: "Register Patient", link: "/RegisterPatient", id: 5 },
  { item: "Logout", link: "/Login", id: 6 },
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

const RegisterPatient = (props) => {
  const navigate = useNavigate();
  
    const [values, setValues] = useState({
        firstName: null,
        lastName: null,
        email: null,
        regDate: null,
        age: null,
        bloodGroup: null,
        mobile: null,
        street: null,
        city: null,
        pinCode: null,
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
        await api.post("/create_patient", values).then((response) => {
          if (response.status===200){
            alert("Patient Get Registered");
            
            navigate(`../ReceptionistPage`, {
              state: {
                show: false,
              }
            });
          }
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
                  Patient Registration
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
                value={values.email}
                type="email"
                name="email"
                placeholder="Enter email id"
                onChange={handleChange}
              />
              <InputField
                value={values.regDate}
                type="date"
                name="regDate"
                onChange={handleChange}
              />
               <InputField
                value={values.age}
                type="number"
                name="age"
                placeholder="Enter Age"
                onChange={handleChange}
              />
               <Dropdown
                data={[
                  { value: 1, label: "A+" },
                  { value: 2, label: "A-" },
                  { value: 3, label: "B+" },
                  { value: 4, label: "B-" },
                  { value: 5, label: "O+" },
                  { value: 6, label: "O-" },
                  { value: 7, label: "AB+" },
                  { value: 8, label: "AB-" },
                ]}
                name="bloodGroup"
                value={values.bloodGroup}
                placeholder="Select Blood Group"
                onChange={handleChange}
                iclass="dropStyle"
              ></Dropdown>
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

export default RegisterPatient;
