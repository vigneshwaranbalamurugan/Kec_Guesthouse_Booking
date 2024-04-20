import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'



const Admin = () => {
  const [bookings, setBookings] = useState([]);
  const dept = localStorage.getItem('dept');
  const handleApproveClick = (date, startTime, email) => {
    const requestData = {
      date,
      startTime,
      email
    };
    console.log(date);
    axios.post(`http://localhost:5000/${dept}/aprove`, requestData)
      .then(response => {
        console.log(response.data);
        window.location.reload();
      })
      .catch(error => {
        console.error(error);
      });
  };
  const handleDenyClick = (date, startTime, email) => {
    const reason = window.prompt("Enter Reason");
    const requestData = {
      date,
      startTime,
      email,
      reason
    };
    console.log(date);
    axios.post(`http://localhost:5000/${dept}/deny`, requestData)
      .then(response => {
        console.log(response.data);
        window.location.reload();
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/${dept}/pending`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log(data);
        setBookings(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dept]);

  return (
    <section className='container'>
      <h2>Booking Data</h2>
      {bookings.map((booking, index) => (
        <div className='container adm_container' key={index}>
          {booking.timeSlots.map((timeSlot, slotIndex) => (
            <article className='adm' key={slotIndex}>
              <div className='adm_content'>
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Start Time</th>
                      <th>End Time</th>
                      <th>Email</th>
                      <th>Event Name</th>
                      <th>Sub Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr key={slotIndex}>
                      <td>{booking.date}</td>
                      <td>{timeSlot.startTime}</td>
                      <td>{timeSlot.endTime}</td>
                      <td>{timeSlot.email}</td>
                      <td>{timeSlot.eventName}</td>
                      <td>{timeSlot.subName}</td>
                    </tr>
                  </tbody>
                </table>
                <div className='adm_footer'>
                  <Link to={``} className='btn primary' onClick={() => handleApproveClick(booking.date, timeSlot.startTime, timeSlot.email)}>Approve</Link>
                  <Link to={``} className='btn danger' onClick={() => handleDenyClick(booking.date, timeSlot.startTime, timeSlot.email)}>Deny</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      ))}
      <Link to='/' className='btn primary'>Home</Link>
    </section>
  )
}

export default Admin