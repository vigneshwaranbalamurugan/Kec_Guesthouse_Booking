import React, { useState } from 'react';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [society, setSocietyName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
   

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

  const handleSignup = async () => {
    try {
      if (!validateEmail(email)) {
        alert('Enter Valid Email');
        return;
     }

     if(email!=='vigneshwaranb.22cse@kongu.edu' && email!=='shriraammks.22cse@kongu.edu' && email!=='vijaybharathv.22cse@kongu.edu')
     {
       alert('your are not allowed');
      return;
     }
     
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        console.error('Passwords do not match');
        return;
      }
      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, society,password }),
      });

      if (response.ok) {
        const Message = await response.json();
        alert(Message.message);
        setEmail('');
        setSocietyName('');
        setPassword('');
        setConfirmPassword('');
      } else {
        const erroMessage= await response.json();
        console.log(erroMessage);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <label>Email:</label>
      <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />

      <label>Society Name:</label>
      <input type="text" name="society" value={society} onChange={(e) => setSocietyName(e.target.value)} />

      <label>Password:</label>
      <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <label>Confirm Password:</label>
      <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

      <button onClick={handleSignup}>Signup</button>
    </div>
  );
};

export default Signup;
