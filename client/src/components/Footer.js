import React from 'react'
import {Link} from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
      <ul className='footer_categories'>
        <li><Link to='halls/categories/KEC'>KEC</Link></li>
        <li><Link to='halls/categories/CSE'>CSE</Link></li>
        <li><Link to='halls/categories/IT'>IT</Link></li>
        <li><Link to='halls/categories/MBA'>MBA</Link></li>
        <li><Link to='halls/categories/EEE'>EEE</Link></li>
        <li><Link to='halls/categories/AUTO'>AUTO</Link></li>
        <li><Link to='halls/categories/S&H'>S&H</Link></li>


      </ul>
    <div className='footer_copyright'>
      <small>
        All rights reserved &copy; Copyright, Kongu Engineering College
      </small>
    </div>
    </footer>
  )
}

export default Footer