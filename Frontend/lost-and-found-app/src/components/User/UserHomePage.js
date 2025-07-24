import React from 'react'
import { Link } from 'react-router-dom';
import AdminNavbar from '../Navbar/UserNavbar';
import HomeImg from '../Pictures/UserHome.jpg';

const UserHome = () => {

  return (
    <div>
      <AdminNavbar></AdminNavbar>
      <br/><br></br>
      
      <h1 className='ha5' style={{textAlign: 'center', fontWeight: 'bold', color: '#3c777dff'}}>Welcome to Lost and Found Management System!</h1>
      <h3 style={{textAlign: 'center', fontWeight: 'initial', color: '#3c777dff'}}>Lost it? List it. Found it? Shout it!</h3>
     
     <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
        <img src={HomeImg} alt="Image" style={{width: '60%', height: '70%'}}/>
    </div>
      
    </div>
  )
}

export default UserHome;
