import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';

function Table() {
  if(localStorage.getItem('isLogin') ==='true'){
    $(".login-btn").css({display: "none"});
    $(".logout-btn").css({display: "block"});
    $("#book-container").css({display:"block"});
  }
  const [bookings, setBookings] = useState([]);
  const { id } = useParams();
   
  const [date, setSelectedDate] = useState('');
  const [startTimes, setSelectedTimeSlots] = useState([]);
  const [email, setEmail] = useState(localStorage.getItem('email'));
  const [eventName, setEventName] = useState('');
  const [subName, setSubName] = useState('');
  const [organisedBy, setOrganisedBy] = useState('');
  

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    setSelectedTimeSlots('');
  };

  const handleTimeSlotChange = (event) => {
    const { value } = event.target;
    setSelectedTimeSlots(prevSelectedTimeSlots => {
      if (prevSelectedTimeSlots.includes(value)) {
        return prevSelectedTimeSlots.filter(slot => slot !== value);
      } else {
        return [...prevSelectedTimeSlots, value];
      }
    });
  };

  const handleSubmit = async(event) => {

      var dept='';
      if(id==='11')
      {
        dept='it';
      }
      else if(id==='21')
      {
        dept='eee'
      }
      else if(id==='31')
      {
        dept='aud/cc'
      }
      else if(id==='32')
      {
        dept='aud/mah'
      }
      else if(id==='41')
      {
        dept='cse'
        console.log(dept);
      }
      else if(id==='51')
      {
        dept='mba'
      }
      else{
        dept='ss';
      }
    event.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/${dept}/bookslot`, {
        date,
        startTimes,
        email,
        eventName,
        subName,
      });
  
      console.log('Form submitted:', response.data);
      window.location.reload();
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle errors
    }
  };

  useEffect(() => {
    async function fetchBookings() {
      try {
        var dept='';
        if(id==='11')
        {
          dept='it';
        }
        else if(id==='21')
        {
          dept='eee'
        }
        else if(id==='31')
        {
          dept='aud/cc'
        }
        else if(id==='32')
        {
          dept='aud/mah'
        }
        else if(id==='41')
        {
          dept='cse'
          console.log(dept);
        }
        else if(id==='51')
        {
          dept='mba'
        }
        else{
          dept='ss'
        }

        const response = await fetch(`http://localhost:5000/${dept}/table`);
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    }

    fetchBookings();
  }, []);

  return (
    <section className='container'>
    <div>
      <h1>Week Table</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>9:00 AM - 10:00 AM</th>
            <th>10:00 AM - 11:00 AM</th>
            <th>11:00 AM - 12:00 PM</th>
            <th>12:00 PM - 1:00 PM</th>
            <th>1:00 PM - 2:00 PM</th>
            <th>2:00 PM - 3:00 PM</th>
            <th>3:00 PM - 4:00 PM</th>
          </tr>
        </thead>
        <tbody>
        {bookings.map(booking => (
        <tr key={booking.date}>
        <td>{booking.date}</td>
         {booking.timeSlots.map(slot => (
        <td key={`${booking.date}-${slot.startTime}`} className={slot.booked === 'empty' ? 'available' : slot.booked==='pending'?'pending':'booked'}>
          {slot.booked === 'empty' ? 'Available' :slot.booked === 'pending'?'pending':'booked'}
        </td>
      ))}
       </tr>
     ))}
     </tbody>
      </table>
      <br>
      </br>
      <strong>Login to Book</strong>
    </div>
    <div className='container' id='book-container' style={{marginTop:"3px"}}>
    <form onSubmit={handleSubmit}>
      <label htmlFor="date">Select Date:</label>
      <select id="date" name="date" value={date} onChange={handleDateChange}>
        <option value="">Select</option>
        {bookings.map(booking => (
          <option key={booking.date} value={booking.date}>{booking.date}</option>
        ))}
      </select>

      {date && (
  <fieldset>
    <legend>Available Time Slots:</legend>
    {bookings.map(booking => {
      if (booking.date === date) {
        return booking.timeSlots.map((slot, index) => (
          <div key={index}>
            {}
            {slot.booked === 'empty' &&  (
              <>
                <input
                  type="checkbox"
                  id={`${slot.startTime}-${slot.endTime}`}
                  name="timeSlot"
                  value={`${slot.startTime}`}
                  checked={startTimes.includes(`${slot.startTime}`)}
                  onChange={handleTimeSlotChange}
                />
                <label htmlFor={`${slot.startTime}-${slot.endTime}`}>
                  {slot.startTime} - {slot.endTime}
                </label>
              </>
            )}
          </div>
        ));
      }
      return null; // Return null if the booking date doesn't match selectedDate
    })}
  </fieldset>
)}
      
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" value={localStorage.getItem('email')} onChange={(e) => setEmail(e.target.value)} required disabled='true'/>

      <label htmlFor="eventName">Event Name:</label>
      <input type="text" id="eventName" name="eventName" value={eventName} onChange={(e) => setEventName(e.target.value)} required />

      <label htmlFor="subName">Sub Name:</label>
      <input type="text" id="subName" name="subName" value={subName} onChange={(e) => setSubName(e.target.value)} required />

      <label htmlFor="organisedBy">Organised By:</label>
      <input type="text" id="organisedBy" name="organisedBy" value={organisedBy} onChange={(e) => setOrganisedBy(e.target.value)} required />

      <button type="submit">Book Now</button>
    </form>
    </div>
    </section>
  );
}

export default Table;
