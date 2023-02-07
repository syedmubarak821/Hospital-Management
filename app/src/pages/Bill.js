import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import InputField from "../components/Fields/InputField";
import Button from "@material-ui/core/Button";
import { useLocation } from "react-router-dom";
import { api } from "../components/Data/axiosv";
import Typography from "@material-ui/core/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import moment from 'moment';
import { useNavigate } from "react-router-dom";

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
      width: theme.spacing(50),
    },
    smallButtonStyle: {
      display: "block",
      marginTop: "40px",
    },
    paperstyling: {},
    formstyling: {
      padding: theme.spacing(10),
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

const Bill = () => {
  const [values, setValues] = useState({
    firstName: null,
    lastName: null,
    bloodGroup: null,
    age: null,
    appDate: null,
    appTime: null,
    description: null,
    treatmentStatus: null,
    treatmentPrice: null, // Doctor Price
    totalPrice: null,   // Medicine Price
  });
  const [option,setOption] = useState("yes");
  const handleOptionChange = (e)=>{
    setOption(e.target.value);
  }
  const location = useLocation();
  const [medicine, setMedicine] = useState([]);
  const [med_ID, setMed_ID] = useState([]);
  const [ID, setID] = useState(location.state.ID);
  const [assignedMedicines, setAssignedMedicines] = useState(null);
  const navigate = useNavigate();
  const [v,setV] = useState(null);
  const handleSubmit = (e)=>{
    e.preventDefault();
    navigate(`/BillResult`,{
      state: {
        doctorPrice: v,
        medicinePrice: values.totalPrice,
        assignedMed: assignedMedicines,
        option: option
      }
    });
  }
  useEffect(()=>{
    api
      .post("/get_appointment", { ID })
      .then((response) => {
        const data = response.data[0];
        const {
          firstName,
          lastName,
          bloodGroup,
          age,
          appDate,
          appTime,
          description,
          treatmentStatus,
          treatmentPrice
        } = data;
        setV(data.treatmentPrice);
        setValues({
          ...values,
          firstName: firstName,
          lastName: lastName,
          age: age,
          bloodGroup: bloodGroup,
          appDate: moment(appDate).format("DD/MM/YYYY"),
          appTime: appTime,
          description: description,
          treatmentStatus: treatmentStatus,
          treatmentPrice: treatmentPrice,
        });
      })
      .catch((err) => {
        console.log(err);
      });



      api.post('/get_assigned_medicines',{ID}).then((response)=>{
        console.log('data is ', response.data);
        setAssignedMedicines(response.data);
        let label = null;
        const array = [];
        const id_a = [];
        let total_price = 0;
        response.data.map((val) => {
          const { med_ID, name,price } = val;
  
          total_price+=price;
          label = `${name}`;
          const thisData = {
            value: med_ID,
            label,
          };
          array.push(thisData);
          id_a.push(med_ID);
        });
        setMedicine(array);
        setMed_ID(id_a);
        setValues({...values, totalPrice: total_price});
        console.log("array is ", array);
      }).catch((err)=>{
        console.log(err);
      })


  },[])
  

  const classes = useStyle();
  return (
    <>
      <NavBar navitem={navitem} />
      <Container className={classes.container} align="center">
        <Grid>
          <Paper elevation={10} className={classes.paperstyling}>
            <Grid className={classes.head}>
              <div className={classes.flexcontainer}>
                <Avatar className={classes.avatar} variant="square">
                  Appointment Details
                </Avatar>
              </div>
            </Grid>
            <form autoComplete="off" className={classes.formstyling}>
              <InputField
                value={values.firstName}
                type="text"
                name="firstName"
                label="Patient First Name"
                ronly={true}
              />
              <InputField
                value={values.lastName}
                type="text"
                name="lastName"
                label="Patient Last Name"
                ronly={true}
              />
              <InputField
                value={values.bloodGroup}
                type="text"
                name="bloodGroup"
                label="Patient Blood Group"
                ronly={true}
              />
              <InputField
                value={values.age}
                type="number"
                name="age"
                label="Patient Age"
                ronly={true}
              />
              <InputField
                value={values.appDate}
                type="text"
                name="appDate"
                label="Appointment Date"
                ronly={true}
              />
              <InputField
                value={values.appTime}
                type="text"
                name="appTime"
                label="Appointment Time"
                ronly={true}
              />
              <InputField
                value={values.description}
                type="textarea"
                name="description"
                label="Problem Description"
                ronly={true}
              >
              </InputField>
              <InputField
                value={
                  values.treatmentStatus !== null
                    ? values.treatmentStatus === 1
                      ? "done"
                      : "pending"
                    : null
                }
                type="text"
                name="treatmentStatus"
                label="Treatment Status"
                ronly={true}
              />
              <InputField
                value={values.treatmentPrice}
                type="number"
                name="treatmentPrice"
                label="Treatment Price"
                ronly={true}
                
              />
              <InputField
                value={values.totalPrice}
                type="number"
                name="totalPrice"
                label="Medicine Price"
                ronly={true}
                iclass="shiftLeft"
              />

              {
                <div style={{ border: "1px solid pink", marginTop: "60px" }}>
                  <Typography variant="h6">Medicines PreScribed Are</Typography>
                  <ul>
                    {med_ID
                      ? med_ID.map((item) =>
                          medicine.map((item2) => {
                            if (item2.value === item) {
                              return <div style={{marginRight: "50px", fontWeight: "bold"}}>{item2.label}</div>;
                            }
                          })
                        )
                      : ""}
                  </ul>
                </div>
              }

              <FormControl>
                <FormLabel>Want Medicines from Hospital?</FormLabel>
                <RadioGroup
                  name="option"
                  value={option}
                  onChange={handleOptionChange}
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label="YES"
                  />
                  <FormControlLabel value="no" control={<Radio />} label="NO" />
                </RadioGroup>
              </FormControl>

              <Button
                type="submit"
                color="primary"
                variant="contained"
                className={classes.buttonStyle}
                onClick={handleSubmit}
              >
                Make Bill
              </Button>
            </form>
          </Paper>
        </Grid>
      </Container>
    </>
  );
};

export default Bill;
