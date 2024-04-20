import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/kec_logo.png'
import { FaHamburger } from "react-icons/fa";
import $ from 'jquery';
document.addEventListener("DOMContentLoaded", function () {
  // Your code here

  if (localStorage.getItem('isLogin') === 'true') {
    $(".login-btn").css({ display: "none" });
    $(".logout-btn").css({ display: "block" });
  }


  if (localStorage.getItem('admin') === 'true') {
    $(".login-btn").css({ display: "none" });
    $(".logout-btn").css({ display: "block" });
  }
});

const handleLogout = () => {
  const confirmation = window.confirm("Are you sure to logout your account");

  if (confirmation) {
    localStorage.removeItem('isLogin')
    localStorage.removeItem('email')
    localStorage.removeItem('password')
    localStorage.removeItem('society')
    localStorage.removeItem('dept');
    localStorage.removeItem('admin');
    window.location.reload();
  }
}


const Header = () => {
  return (
    <nav>
      <div className='container nav_container'>
        <div className='logo_container'>
          <Link to='/' className='nav_logo'>
            <img src={Logo} alt="KEH" />
          </Link>
          <Link to='/'><h3>Kongu Event Hub</h3></Link>
        </div>
        <ul className='nav_menu'>
          <li><Link to="/profile/:id">Profile</Link></li>
          <li><Link to="/departments">Departments</Link></li>
          <li className='login-btn'><Link to='/loginsignup'>Login/Signup</Link></li>
          <li className='logout-btn' onClick={() => handleLogout()}>LogOut</li>
        </ul>
        <button className='nav_toggle_btn'>
          <FaHamburger />
        </button>
      </div>
    </nav>
  )
}

export default Header