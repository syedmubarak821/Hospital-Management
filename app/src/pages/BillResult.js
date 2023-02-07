import React, { useState } from "react";
import NavBar from "../components/NavBar";
import MTable from "../components/MTable";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { useLocation } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";
import moment from "moment";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const navitem = [
  { item: "Make Bill", link: "/MakeBill", id: 1 },
  { item: "Add Appointment", link: "/AddAppointment", id: 2 },
  { item: "About us", link: "/AboutUs", id: 3 },
  { item: "Register Patient", link: "/RegisterPatient", id: 5 },
  { item: "Logout", link: "/PharmaLogin", id: 6 },
];

const useStyle = makeStyles((theme) => {
  return {
    container: {
      marginTop: theme.spacing(5),
      backgroundColor: "#efe6fe",
    },
    gridSetting: {
      margin: theme.spacing(2),
      marginLeft: theme.spacing(40),
    },
  };
});
const BillResult = () => {
  const location = useLocation();
  const [dprice, setdprice] = useState(location.state.doctorPrice);
  const [medPrice, setMedPrice] = useState(location.state.medicinePrice);
  console.log('medicine price ',medPrice);
  const [data, setData] = useState(location.state.assignedMed);
  const [option, setOption] = useState(location.state.option);
  
  console.log('Treatment Price ',dprice);
  const [val, setVal] = useState([]);
  data.map((obj) => {
    console.log(obj.expDate);
    obj.expDate = moment(obj.expDate).format("YYYY-MM-DD");

    const { name, medicineType, expDate, price } = obj;
    val.push({ name, medicineType, expDate, price });
  });
  const classes = useStyle();
  const column = [
    { id: 1, item: "No. " },
    { id: 2, item: "Medicine Name" },
    { id: 3, item: "Type" },
    { id: 4, item: "Expiry Date" },
    { id: 5, item: "Price" },
  ];
  return (
    <>
      <NavBar navitem={navitem} />
      <Container align="center" className={classes.container}>
        <Grid container>
          <Grid item className={classes.gridSetting}>
            <Typography
              variant="h4"
              style={{
                marginTop: "25px",
                width: "100%",
                border: "2px solid #D3D3D3",
              }}
            >
              Your Bill
            </Typography>
            <Typography variant="h5" style={{ marginTop: "30px" }}>
              Assigned Medicines
            </Typography>
            <br />

            <MTable column={column} rows={val} />
            <TableContainer component={Paper} style={{marginTop: "20px", width: "300px", marginLeft: "400px"}}  >
            <Table>
              <TableBody>
                <TableRow >
                  <TableCell>Medicines From Hospital</TableCell>
                  <TableCell >{option}</TableCell>
                </TableRow>
                <TableRow >
                  <TableCell>Medicines Price</TableCell>
                  <TableCell >{medPrice}</TableCell>
                </TableRow>
                <TableRow >
                  <TableCell>Treatment Price</TableCell>
                  <TableCell >{dprice}</TableCell>
                </TableRow>
                <TableRow >
                  <TableCell> Price To Pay</TableCell>
                  <TableCell >{(option==="yes")? dprice+medPrice : dprice}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default BillResult;
