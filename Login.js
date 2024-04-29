import React, { useState } from 'react';
import './App.css'; // Import your CSS file here

function App() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <section className="bg-gray-300 min-h-screen flex items-center justify-center">
      <div className="bg-sky-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        <div className="md:w-1/2 px-16">
          <h2 className="font-bold text-2xl text-[#467599]">Login</h2>
          <p className="text-sm mt-4 text-[#467599]">If you are already a existing user easily login</p>
          <form action="" className="flex flex-col gap-4">
            <input className="p-2 mt-8 rounded-xl border" type="text" name="email" placeholder="Enter your Email" />
            <div className="relative">
              <input id="password" className="p-2 mt-8 rounded-xl border w-full" type={passwordVisible ? "text" : "password"} name="password" placeholder="Password" />
              <svg id="eyeOpen" onClick={togglePasswordVisibility} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" className="bi bi-eye absolute top-1/2 right-2 translate-y-1/2" viewBox="0 0 16 16">
                {/* SVG paths */}
              </svg>
              <svg id="eyeClosed" onClick={togglePasswordVisibility} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" className="bi bi-eye-slash absolute top-1/2 right-2 translate-y-1/2" viewBox="0 0 16 16" style={{display: passwordVisible ? "block" : "none"}}>
                {/* SVG paths */}
              </svg>
            </div>
            <button className="bg-[#467599] rounded-xl text-white py-2 hover:scale-105 duration-300">Log In</button>
          </form>
          {/* Rest of your code */}
        </div>
        <div className="w-1/2">
          <img className="rounded-2xl" src="./assets/Login.jpg" alt="Login" />
        </div>
      </div>
    </section>
  );
}

export default App;
