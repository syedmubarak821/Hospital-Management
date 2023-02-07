import React from 'react'
import NavBar from '../components/NavBar'
import LoginCard from '../components/LoginCard'

const navitem = [
  { item: "About us", link: "/AboutUs", id: 1 },
  { item: "Login", link: "/Login", id: 3 },
];

const PharmaLogin = () => {
  
  const title = "Pharmacist Login"
  return (
    <div>
      <NavBar navitem={navitem}/>
      <LoginCard title={title} link='pharmacist_login' page='PharmaPage'/>
    </div>
  )
}

export default PharmaLogin
