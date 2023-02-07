import React,{useState, useEffect} from 'react'
import NavBar from '../components/NavBar'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'
import {makeStyles} from '@material-ui/core'
import InputField  from '../components/Fields/InputField'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import Dropdown from '../components/Fields/Dropdown'


const api = axios.create({
    baseURL: "http://localhost:3001/",
  });
  

  const navitem = [
    { item: "Make Bill", link: "/MakeBill", id: 1 },
    { item: "Add Appointment", link: "/AddAppointment", id: 2 },
    { item: "About us", link: "/AboutUs", id: 3 },
    { item: "Register Patient", link: "/RegisterPatient", id: 4 },
    { item: "Logout", link: "", id: 5 },
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
      sidebuttonstyle : {
          marginTop: "40px",
          marginRight: "60px",
          marginLeft: "150px"
      },
      
    };
  });
  
  
const AddAppointment = () => {
    const classes = useStyle();
    const [ddata, setDdata] = useState([]);
    const [values, setValues] = useState({
        patientID: null,
        name: null,
        doctorID: null, 
        age: null,
        date: null, 
        bloodGroup: null,
        appDate: null,
        appTime: null,
        time: null,
        description: null,
      });
      
      const handleChange = (e) => {
        const value = e.target.value;
        setValues({...values,[e.target.name]: value});
      };
      const handleGetPatient = async(e)=>{
        if (values.patientID!=null){

        
        await api.post("/get_patient", values).then((response) => {
          let today = new Date();
          let date =today.getDate()  + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
          let time = today.toLocaleString('en-US', { hour: 'numeric',minute: 'numeric', hour12: true })
          const {firstName, bloodGroup, age} = response.data[0];

          setValues({...values, "name": firstName, "age": age, "bloodGroup": bloodGroup, "date": date, "time": time});
       }).catch(err => console.log(err));
        }else {
          alert("Kindly Enter ID");
        }
      }

      const handleSubmit = async(e)=>{
        console.log(values.doctorID);
        alert(values.doctorID);
        const picked = (({ patientID, date,doctorID,appDate,appTime ,time,description}) => ({ patientID, date,doctorID,appDate,appTime ,time,description}))(values);
        console.log(picked);
        await api.post('/create_appointment',picked).then((response)=>{
          if (response.status===200){
            alert("Doctor is appointed succesfully");
              }
        }).catch(err => console.log(err))
      }

      useEffect(  ()=>{
        api.get("/get_doctors").then((response)=>{
          // const [value1,value2] = response.data;
          // console.log(value1,value2);
          let label = null;
          const array = [];
          response.data.map((val) => {
            const {doctorID, firstName,lastName,specialist} = val;
            label =  `${firstName} ${lastName} (${specialist})`;
            const thisData = {
              value: doctorID,
              label
            }
            array.push(thisData);
          })
          setDdata(array);
          console.log('array is ',array);
        }).catch(err => console.log(err));
      },[])
    
  return (
    <>
      <NavBar navitem={navitem}/>
      <Container className={classes.container} align="center">
        <Grid>
          <Paper elevation={10} className={classes.pstyle}>
            <Grid>
              <div className={classes.temp}></div>
              <div className={classes.head}>
                <Avatar className={classes.avatar} variant="square">
                  Add Appointment
                </Avatar>
              </div>
            </Grid>
            <form autoComplete="off" className={classes.formstyling}>
            <InputField
                value={values.patientID}
                type="number"
                name="patientID"
                placeholder="Enter Patient ID"
                onChange={handleChange}
              />

            <Button
                className={classes.sidebuttonstyle}
                variant="outlined"
                color="primary"
                onClick={handleGetPatient}
              >
                Get Patient
              </Button>
              <InputField
                value={values.name}
                type="text"
                name="name"
                placeholder="Patient Name"
                onChange={handleChange}
                ronly = {true}
              />
              <InputField
                value={values.age}
                type="number"
                name="age"
                placeholder="Patient Age"
                onChange={handleChange}
                ronly={true}
              />
              <InputField
                value={values.bloodGroup}
                type="text"
                name="bloodGroup"
                placeholder="Patient Blood Group"
                onChange={handleChange}
              />
              <InputField
                value={values.date}
                type="text"
                name="date"
                placeholder="Appointment Taking Date"
                ronly={true}
                onChange={handleChange}
              />
              <InputField
                value={values.time}
                type="text"
                name="time"
                placeholder="Appointment Taking Time"
                ronly={true}
                onChange={handleChange}
              />
              
               <Dropdown
                data={ddata}
                name="doctorID"
                value={values.doctorID}
                placeholder="Select Doctor"
                onChange={handleChange}
                takeValue={true}
                iclass="dropStyle"
              ></Dropdown>
             <InputField
                value={values.appDate}
                type="date"
                name="appDate"
                placeholder="Appointment Date"
                onChange={handleChange}
              />
              <Dropdown
                data={[
                  { value: 1, label: "09:00 - 10:00 am" },
                  { value: 2, label: "10:00 - 11:00 am" },
                  { value: 3, label: "11:00 - 12:00 am" },
                  { value: 4, label: "12:00 - 01:00 pm" },
                  { value: 5, label: "01:00 - 02:00 pm" },
                  { value: 6, label: "02:00 - 03:00 pm" },
                  { value: 7, label: "03:00 - 04:00 pm" },
                  { value: 8, label: "04:00 - 5:00 pm" },
                  { value: 9, label: "05:00 - 6:00 pm" },
                ]
                }
                name="appTime"
                value={values.appTime}
                placeholder="Select Appointment Time"
                onChange={handleChange}
                iclass="dropStyle"
              ></Dropdown>
              <InputField
                value={values.description}
                type="textarea"
                name="description"
                placeholder="Enter Description"
                onChange={handleChange}
              />
              <Button
                className={classes.buttonStyle}
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Add Appointment
              </Button>
              
            </form>
          </Paper>
        </Grid>
      </Container>

    </>
  )
}

export default AddAppointment
