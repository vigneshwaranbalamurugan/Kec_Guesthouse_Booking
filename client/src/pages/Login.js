import React, { useState } from 'react';

const Login = () => {
  const [userType, setUserType] = useState('User'); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userType, email, password }),
      });

      if (response.ok) {
        const Message = await response.json();
        if(Message.dept)
        {
          alert('welcome chief');
          localStorage.setItem('admin','true');
          localStorage.setItem('dept',Message.dept);
          window.location.href='/admin';
        }else{
        localStorage.setItem('email', Message.email);
      localStorage.setItem('society', Message.society);
      localStorage.setItem('isLogin','true');
       window.location.href='/';
       console.log(Message);
      }
      } else {
        const erroMessage = await response.json();
        alert(erroMessage.message);
        console.log(erroMessage);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div className="container">
    <label>User:</label>
    <select value={userType} onChange={(e) => setUserType(e.target.value)}>
      <option value="Admin">Admin</option>
      <option value="User">User</option>
    </select>
    <label>Email:</label>
    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
    <label>Password:</label>
    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
    <strong>user:vigneshwaranb.22cse@kongu.edu<br></br>password:1234</strong><br></br>
    <strong>admin:adminit@gmail.com <br></br>password:1234</strong><br></br>
    <button onClick={handleLogin}>Login</button>
  </div>
  );
};

export default Login;
