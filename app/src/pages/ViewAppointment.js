import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Avatar } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import InputField from "../components/Fields/InputField";
import Dropdown from "../components/Fields/Dropdown";
import Button from "@material-ui/core/Button";
import { useLocation } from "react-router-dom";
import { api } from "../components/Data/axiosv";
import moment from "moment";
import Typography from "@material-ui/core/Typography";
import { spacing } from "@mui/system";

const navitem = [
  { item: "View My Patients", link: "/ViewPatient", id: 1 },
  { item: "About Us", link: "/AboutUs", id: 2 },
  { item: "Logout", link: "/Login", id: 4 },
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
const ViewAppointment = () => {
  const [values, setValues] = useState({
    firstName: null,
    lastName: null,
    bloodGroup: null,
    age: null,
    appDate: null,
    appTime: null,
    description: null,
    treatmentStatus: null,
    treatmentPrice: null,
  });
  const classes = useStyle();

  const location = useLocation();
  const [medicine, setMedicine] = useState([]);

  const [med_ID, setMedID] = useState([]);
  const [ID, setID] = useState(location.state.apid);
  console.log(ID);
  useEffect(() => {
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
        } = data;
        setValues({
          ...values,
          firstName: firstName,
          lastName: lastName,
          age: age,
          bloodGroup: bloodGroup,
          appDate: moment(appDate).format("DD/MM/YYYY"),
          appTime: appTime,
          description: description,
        });
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    api
      .get("/get_medicines")
      .then((response) => {
        let label = null;
        const array = [];
        response.data.map((val) => {
          const { med_ID, name } = val;
          label = `${name}`;
          const thisData = {
            value: med_ID,
            label,
          };
          array.push(thisData);
        });
        setMedicine(array);
        console.log("array is ", array);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setValues({
      ...values,
      [e.target.name]: value,
    });
  };
  const handleDataChange = (e) => {
    const v = e.target.value;
    setMedID([...med_ID, v]);
    const value = e.target.value;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const treatmentStatus = values.treatmentStatus;
    const treatmentPrice = values.treatmentPrice;
    api
      .post("/update_appointment", { ID, treatmentStatus, treatmentPrice })
      .then((response) => {
        alert("updated");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleAddMedicine= (e)=>{
    e.preventDefault();
    api.post('/assign_medicine', {ID, med_ID}).then((response)=>{
    
      if (response.status===200){
        alert("Assigned Medicines");
      }
    }).catch((err)=>{
      console.log(err);
    })
  }
 
 
  console.log(typeof med_ID);
  return (
    <>
      <NavBar navitem={navitem} />
      <Container className={classes.container} align="center">
        <Grid>
          <Paper elevation={10} className={classes.paperstyling}>
            <Grid className={classes.head}>
              <div className={classes.flexcontainer}>
                <Avatar className={classes.avatar} variant="square">
                  View Appointed Patient
                </Avatar>
              </div>
            </Grid>
            <form autoComplete="off" className={classes.formstyling}>
              <InputField
                value={values.firstName}
                type="text"
                name="firstName"
                placeholder="Patient First Name"
                ronly={true}
              />
              <InputField
                value={values.lastName}
                type="text"
                name="lastName"
                placeholder="Patient Last Name"
                ronly={true}
              />
              <InputField
                value={values.bloodGroup}
                type="text"
                name="bloodGroup"
                placeholder="Patient Blood Group"
                ronly={true}
              />
              <InputField
                value={values.age}
                type="number"
                name="age"
                placeholder="Patient Age"
                ronly={true}
              />
              <InputField
                value={values.appDate}
                type="text"
                name="appDate"
                placeholder="Appointment Date"
                ronly={true}
              />
              <InputField
                value={values.appTime}
                type="text"
                name="appTime"
                placeholder="Appointment Time"
                ronly={true}
              />
              <InputField
                value={values.description}
                type="textarea"
                name="description"
                placeholder="Problem Description"
                ronly={true}
              />
              <Dropdown
                data={[
                  { value: 1, label: "done" },
                  { value: 0, label: "pending" },
                ]}
                name="treatmentStatus"
                value={values.treatmentStatus}
                placeholder="Select Status"
                onChange={handleChange}
                takeValue={true}
                iclass="leftStyle"
                frequired={false}
              ></Dropdown>
              <InputField
                value={values.treatmentPrice}
                type="number"
                name="treatmentPrice"
                placeholder="Treatmet Price"
                onChange={handleChange}
                frequired={false}
              />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                className={classes.buttonStyle}
                onClick={handleSubmit}
                fullWidth
              >
                Update Apppointment
              </Button>

              <Typography
                variant="h5"
                style={{ marginTop: "50px", backgroundColor: "lightGray" }}
              >
                Assign Medicine To Patient
              </Typography>
              <Dropdown
                data={medicine}
                name="medID"
                value={med_ID[med_ID.length-1]}
                placeholder="Select Medicine"
                onChange={handleDataChange}
                takeValue={true}
              ></Dropdown>
              
              {
                <div style={{border: "1px solid pink", marginTop: "60px"}}>
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

              <Button
              type="submit"
              color="primary"
              variant="contained"
              className={classes.buttonStyle}
              onClick={handleAddMedicine}
              fullWidth
              >Add Medicine</Button>
            </form>
          </Paper>
        </Grid>
      </Container>
    </>
  );
};

export default ViewAppointment;
