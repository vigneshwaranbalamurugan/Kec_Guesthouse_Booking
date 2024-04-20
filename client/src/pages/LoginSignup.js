import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import './LoginSignup.css'

function LoginSignup() {
  const [activeTab, setActiveTab] = useState('login');
  
  return (
    <section className='container section lgsu'>
      <div className='authnav'>
        <button className='btn auth' onClick={() => setActiveTab('login')}>Login</button>
        <button className='btn auth' onClick={() => setActiveTab('signup')}>Signup</button>
      </div>

      {activeTab === 'login' ? <Login /> : <Signup />}
    </section>
  );
}

export default LoginSignup;
