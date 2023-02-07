import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import Table from "../components/MTable";
import { api } from "../components/Data/axiosv";
import Button from "@material-ui/core/Button";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const navitem = [
  { item: "View My Patients", link: "/ViewPatient", id: 1 },
  { item: "About Us", link: "/AboutUs", id: 2 },
  { item: "Logout", link: "/Login", id: 4 },
];

const column = [
  { id: 1, item: "Appointment No." },
  { id: 2, item: "Patient Name" },
  { id: 3, item: "Appointment Date" },
  { id: 4, item: "Appointment Time" },
  { id: 5, item: "Treatment Status" },
  { id: 6, item: "Take Action" },
];

const useStyle = makeStyles((theme) => {
  return {
    container: {
      marginTop: theme.spacing(5),
      margin: theme.spacing(2),
      border: "1px dotted pink",
    },
    gridSetting: {
      margin: theme.spacing(2),
      marginLeft: theme.spacing(40),
    },

  };
});

const ViewPatient = () => {
  
  const navigate = useNavigate();
  const handleClick = (e)=>{
    console.log(e.currentTarget.value);
    navigate(`/ViewAppointment`,{
      state: {
        apid : e.currentTarget.value,
      }
    });
    
  }

  const classes = useStyle();
  let username = localStorage.getItem("name");
  const [data, setData] = useState([]);
  console.log("username is ", username);
  useEffect(() => {
    api
      .post("/get_doctor", { username })
      .then((response) => {
        const { doctorID } = response.data;
        if (doctorID != null) {
          api
            .post("/get_appointments_today", { doctorID })
            .then((response) => {
              let array = response.data;
              let id_a = [];
              for (let i=0;i<array.length;i++){
                id_a.push(array[i].ID);
              }    
              console.log('ides are ',id_a);
              array.forEach(a => delete a.ID);
              
              console.log('ides are ',id_a);
              let i=0;
              array.map((obj) => {
                obj.appDate = moment(obj.appDate).format("DD/MM/YYYY");
                if (obj.treatmentStatus === 0) {
                  obj.treatmentStatus = "pending";
                } else {
                  obj.treatmentStatus = "done";
                }
                obj["button"] = (
                  <Button
                    value={id_a[i++]}
                    type="submit"
                    color="primary"
                    variant="contained"
                    onClick={handleClick}
                  >
                    View
                  </Button>
                );
              });

              setData(array);
            })
            .catch((err) => console.log(err));
        } else {
          alert("No doctor exist with that username");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <NavBar navitem={navitem} />

      <div align="center" className={classes.container}>
        <Grid container>
          <Grid item className={classes.gridSetting}>
            <Typography variant="h3"> APPOINTMENTS</Typography>
            <br />
            <Table column={column} rows={data}/>
          </Grid>
          {/* <Grid item className={classes.gridSetting}>
            <Typography variant="h3">ALL APPOINTMENTS</Typography>
            <br />
            <Table column={column} rows={data} />
          </Grid> */}
        </Grid>
      </div>
    </>
  );
};

export default ViewPatient;
