import React from 'react'
import NavBar from '../components/NavBar'
import LoginCard from '../components/LoginCard'
const navitem = [
    { item: "About us", link: "", id: 1 },
    { item: "Login", link: "/Login", id: 2 },
  ];


const AdminLogin = () => {
    
  const title = "Admin Login"
  return (
    <div>
      <NavBar navitem={navitem}/>
      <LoginCard title={title} link='admin_login' page='AdminPage'/>
    </div>
  )
}

export default AdminLogin
