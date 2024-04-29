import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


const Login = () => {
  const [userType, setUserType] = useState('User'); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);


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
    
    <div className="logindiv" > 
    <div className="container">
    <label className="flex-cont">User:</label>
    <select  class="border" value={userType} onChange={(e) => setUserType(e.target.value)}>
      <option value="Admin">Admin</option>
      <option value="User">User</option>
    </select>
    <label className="flex-cont">Email:</label>
    <input  class="rounded-2xl " type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
    <label className="flex-cont">Password:</label>
    
    
    <div style={{ position: 'relative', display: 'inline-block' }}>
  <input
    class="rounded-3xl w-1/2"
    type={showPassword ? "text" : "password"}
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    style={{ paddingRight: '30px' }} // Make room for the icon
  />
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    style={{
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      position: 'absolute',
      top: '20%',
      
      transform: 'translateY(-50%)',
    }}
  >
    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
  </button>
</div>
<br></br>
    <button onClick={handleLogin}>Login</button>
  </div></div>
  );
};

export default Login;
