import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import InputField from "../components/Fields/InputField";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/";
import Dropdown from "../components/Fields/Dropdown";
import {api} from "../components/Data/axiosv"
import axios from "axios";

const navitem = [
  { item: "Add Medicine", link: "/AddMedicine", id: 1 },
  { item: "Add Company", link: "/AddCompany", id: 2 },
  { item: "Add Distributor", link: "/AddDistributor", id: 3 },
  { item: "About Us", link: "/AboutUs", id: 4 },
  { item: "Logout", link: "/Login", id: 5 },
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

const AddMedicine = () => {
  const [medDistributor, setMedDistributor] = useState([]);
  const [medCompany, setMedCompany] = useState([]);

  useEffect(()=>{
    const requestOne = api.get('/get_distributor');
    const requestTwo = api.get('/get_company');
    axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
      const responseOne = responses[0];
      const responseTwo = responses[1];

      let label = null;
      const array_1 = [];
      const array_2 = [];
      responseOne.data.map((val) => {
        const {distributorID, name} = val;
        label =  `${name}`;
        const thisData = {
          value: distributorID,
          label
        }
        array_1.push(thisData);
      })
      
      console.log('array 1',array_1);
      setMedDistributor(array_1);
      
      responseTwo.data.map((val) => {
        const {companyID, name} = val;
        label =  `${name}`;
        const thisData = {
          value: companyID,
          label
        }
        array_2.push(thisData);
      })
      setMedCompany(array_2);

      console.log('array 2 ',array_2);

    })).catch(errors => {
      console.log(errors);
    })

  },[])

  const [values, setValues] = useState({
    name: null,
    medicineType: null,
    manfDate: null,
    expDate: null,
    quantity: null,
    price: null,
    distributorID: null,
    companyID: null,
    regDate: null,
  });
  const handleChange = (e) => {
    const value = e.target.value;
    setValues({ ...values, [e.target.name]: value });
  };
  const handleSubmit = async ()=>{
    await api.post('/add_medicine',values).then((response)=>{
      if (response.status===200){
        alert("Medicine Added Succesfully");
      }else {
        alert("Can't Add");
      }
    }).catch(err => console.log(err))
  }
  const classes = useStyles();
  return (
    <>
      <NavBar navitem={navitem} />
      <Container className={classes.containerStyle}>
        <Grid>
          <Paper elevation={10} className={classes.paperStyle}>
            <Grid align="center">
              <Avatar className={classes.avatarStyle}></Avatar>
              <Typography variant="h6">Add Medicine</Typography>
            </Grid>

            <InputField
              value={values.name}
              type="text"
              name="name"
              label="Enter Medicine Name"
              onChange={handleChange}
            />
            <Dropdown
              data={[
                { value: 1, label: "Liquid" },
                { value: 2, label: "Tablet" },
                { value: 3, label: "Capsules" },
                { value: 4, label: "Drops" },
                { value: 5, label: "Inhalers" },
                { value: 6, label: "Injections" },
              ]}
              name="medicineType"
              value={values.medicineType}
              placeholder="Select Medicine Type"
              onChange={handleChange}
              iclass="dropStyle"
            ></Dropdown>
            <InputField
              value={values.manfDate}
              type="date"
              name="manfDate"
              label="Enter Manifacture Date"
              onChange={handleChange}
            />
            <InputField
              value={values.expDate}
              type="date"
              name="expDate"
              label="Enter Expiry Date"
              onChange={handleChange}
            />
            <InputField
              value={values.quantity}
              type="number"
              name="quantity"
              label="Enter Quantity"
              onChange={handleChange}
            />
            <InputField
              value={values.price}
              type="number"
              name="price"
              label="Enter Price"
              onChange={handleChange}
            />
            <Dropdown
              data={medDistributor}
              name="distributorID"
              value={values.distributorID}
              placeholder="Select Medicine Distributor"
              onChange={handleChange}
              iclass="dropStyle"
              takeValue={true}
            ></Dropdown>
            <Dropdown
              data={medCompany}
              name="companyID"
              value={values.companyID}
              placeholder="Select Medicine Company"
              onChange={handleChange}
              iclass="dropStyle"
              takeValue={true}
            ></Dropdown>
            <InputField
              value={values.regDate}
              type="date"
              name="regDate"
              label="Enter Registration Date"
              onChange={handleChange}
            />

            <Button
              type="submit"
              color="primary"
              variant="contained"
              className={classes.btnStyle}
              onClick={handleSubmit}
            >
              Register
            </Button>
          </Paper>
        </Grid>
      </Container>
    </>
  );
};

export default AddMedicine;
