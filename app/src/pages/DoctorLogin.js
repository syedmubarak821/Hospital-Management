import React from 'react'
import NavBar from '../components/NavBar'
import LoginCard from '../components/LoginCard'

const navitem = [
  { item: "About us", link: "/AboutUs", id: 1 },
  { item: "Login", link: "/Login", id: 3 },
];

const DoctorLogin = () => {
  
  const title = "Doctor Login"
  return (
    <div>
      <NavBar navitem={navitem}/>
      <LoginCard title={title}  link='doctor_login' page='DoctorPage'/>
    </div>
  )
}

export default DoctorLogin
