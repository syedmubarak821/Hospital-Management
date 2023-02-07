import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import Table from "../components/MTable";
import { api } from "../components/Data/axiosv";
import moment from 'moment';
import Button from '@material-ui/core/Button'
import { useNavigate } from "react-router-dom";

const navitem = [
  { item: "Make Bill", link: "/MakeBill", id: 1 },
  { item: "Add Appointment", link: "/AddAppointment", id: 2 },
  { item: "About us", link: "/AboutUs", id: 3 },
  { item: "Register Patient", link: "/RegisterPatient", id: 5 },
  { item: "Logout", link: "/Login", id: 6 },
];

const column = [
  { id: 1, item: "Appointment No." },
  { id: 2, item: "Patient Name" },
  { id: 3, item: "Patient Age" },
  { id: 4, item: "Blood Group" },
  { id: 5, item: "Patient Contact " },
  { id: 6, item: "Appointed Doctor " },
  { id: 6, item: "Specialization " },
  { id: 7, item: "Appiontment Taken Date" },
  { id: 8, item: "Appointment Taken Time" },
  { id: 9, item: "Appointment Date" },
  { id: 10, item: "Appointment Time" },
  { id: 11, item: "Treatment Status" },
  { id: 12, item: "Treatment Price" },
  { id: 13, item: "Action" },
];

const useStyle = makeStyles((theme) => {
  return {
    container: {
      marginTop: theme.spacing(5),
      margin: theme.spacing(2),
      border: "1px dotted pink",
    },
  };
});

const MakeBill = () => {
    
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const handleClick = (e)=>{
    navigate(`/Bill`,{
      state: {
      ID: e.currentTarget.value,
      }
    });
  }
  useEffect(() => {
    api
      .get("/get_appointment_details")
      .then((response) => {
        let array = response.data;
        let id_a = [];
        for (let i = 0; i < array.length; i++) {
          console.log(array[i].ID);
          id_a.push(array[i].ID);
        }
        console.log(id_a);
        array.forEach((a) => delete a.ID);
        let i = 0;
        array.map((obj) => {
            obj.appDate = moment(obj.appDate).format("DD/MM/YYYY");
            if (obj.treatmentStatus === 0) {
              obj.treatmentStatus = "pending";
            } else {
              obj.treatmentStatus = "done";
            }
            if (obj.treatmentStatus==="pending"){
              obj["button"] = (
                <Typography
                >
                  Treatment Pending
                  {id_a[i++]}
                </Typography>
              );
            }else {
              obj["button"] = (
                <Button
                  value={id_a[i++]}
                  type="submit"
                  color="primary"
                  variant="contained"
                  onClick={handleClick}
                >
                  MakeBill
                </Button>
              );
            }
            
          });

          setData(array);

      })
      .catch((err) => console.log(err));
  }, []);

  const classes = useStyle();
  return (
    <>
      <NavBar navitem={navitem} />

      <div align="center" className={classes.container}>
        <Grid container>
          <Grid item>
            <Typography variant="h3"> APPOINTMENTS</Typography>
            <br />
            <Table column={column} rows={data} />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default MakeBill;
