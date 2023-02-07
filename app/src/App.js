import React from 'react';
import HomePage from "./pages/HomePage";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Login from './pages/Login'
import DoctorLogin from './pages/DoctorLogin' 
import AdminRegister from "./pages/AdminRegister"
import AdminLogin from "./pages/AdminLogin";
import ReceptionistLogin from "./pages/ReceptionistLogin";
import PharmaLogin from "./pages/PharmaLogin";
import AdminPage from "./pages/AdminPage"
import RegisterUser from "./pages/RegisterUser"
import ReceptionistRegister from "./pages/ReceptionistRegister";
import DoctorRegister from "./pages/DoctorRegister";
import PharmaRegister from "./pages/PharmaRegister";
import ReceptionistPage from "./pages/ReceptionistPage"
import PharmaPage from "./pages/PharmaPage";
import {createTheme,ThemeProvider} from '@material-ui/core';
import RegisterPatient from "./pages/RegisterPatient";
import AddAppointment from "./pages/AddAppointment";
import DoctorPage from "./pages/DoctorPage";
import ViewPatient from "./pages/ViewPatient";
import ViewAppointment from './pages/ViewAppointment';
import AboutUs from './pages/AboutUs';
import MakeBill from './pages/MakeBill';
import AddCompany from './pages/AddCompany';
import AddDistributor from './pages/AddDistributor';
import AddMedicine from './pages/AddMedicine'
import Bill from './pages/Bill'
import BillResult from './pages/BillResult';

const theme = createTheme({
  typography: {
    fontFamily: 'Rajdhani',
    fontWeightLight:  300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  }
})

function App() {
  return (
    <>
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route exact path="/" 
          element={<HomePage/>}>
          </Route>
          <Route exact path="/Login" 
          element={<Login/>}>
          </Route>
          <Route exact path="/DoctorLogin" 
          element={<DoctorLogin/>}>
          </Route>
          <Route path="/AdminRegister" 
          element={<AdminRegister/>}>
          </Route>
          <Route path="/ReceptionistRegister" 
          element={<ReceptionistRegister/>}>
          </Route>
          <Route path="/DoctorRegister" 
          element={<DoctorRegister/>}>
          </Route>
          <Route path="/PharmaRegister" 
          element={<PharmaRegister/>}>
          </Route>
          <Route path="/AdminLogin" 
          element={<AdminLogin/>}>
          </Route>
         
          <Route path="/ReceptionistLogin" 
          element={<ReceptionistLogin/>}>

          </Route>
          <Route exact path="/PharmaLogin" 
          element={<PharmaLogin/>}>
          </Route>
          <Route exact path="/AdminPage" 
          element={<AdminPage/>}>
          </Route>
          <Route exact path="/RegisterUser" 
          element={<RegisterUser/>}>
          </Route>
          <Route exact path="/ReceptionistPage" 
          element={<ReceptionistPage/>}>
          </Route>
          <Route exact path="/PharmaPage" 
          element={<PharmaPage/>}>
          </Route>
          <Route exact path="/RegisterPatient" 
          element={<RegisterPatient/>}>
          </Route>
          <Route exact path="/DoctorPage" 
          element={<DoctorPage/>}>
          </Route>
          <Route exact path="/ViewPatient" 
          element={<ViewPatient/>}>
          </Route>
          <Route exact path="/AddAppointment" 
          element={<AddAppointment/>}>
          </Route>
          <Route exact path="/ViewAppointment" 
          element={<ViewAppointment/>}>
          </Route>
          <Route exact path="/AboutUs" 
          element={<AboutUs/>}>
          </Route>
          <Route exact path="/MakeBill" 
          element={<MakeBill/>}>
          </Route>
          <Route exact path="/AddCompany" 
          element={<AddCompany/>}>
          </Route>
          <Route exact path="/AddDistributor" 
          element={<AddDistributor/>}>
          </Route>
          <Route exact path="/AddMedicine" 
          element={<AddMedicine/>}>
          </Route>
          <Route exact path="/Bill" 
          element={<Bill/>}>
          </Route>
          <Route exact path="/BillResult" 
          element={<BillResult/>}>
          </Route>
         
        </Routes>
      </Router>
      </ThemeProvider>
    </>
   
  );
}

export default App;
