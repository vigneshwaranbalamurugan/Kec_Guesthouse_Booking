import React, { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const getNextSevenDays = (startDate) => {
  const dates = [];
  const today = new Date();
  const afterTomorrow = new Date(today);
  afterTomorrow.setDate(afterTomorrow.getDate() + 2); 
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    dates.push({
      date: date.toISOString().split('T')[0],
      clickable: date >= afterTomorrow 
    });
  }
  return dates;
};

const data = {
  '2024-03-20': [
    { starttime: '9:00', endtime: '10:00', booked: 'pending' },
    { starttime: '11:00', endtime: '12:00', booked: 'booked' },
    {starttime:'12:00',endtime:'01:00',booked:'pending'}
  ],
  '2024-03-25': [
    { starttime: '9:00', endtime: '10:00', booked: 'booked' },
    { starttime: '10:00', endtime: '11:00', booked: 'pending' },
    { starttime: '01:00', endtime: '02:00', booked: 'pending' }
  ],
  '2024-03-28': [
    { starttime: '9:00', endtime: '10:00', booked: 'booked' },
    { starttime: '10:00', endtime: '11:00', booked: 'pending' },
    { starttime: '01:00', endtime: '02:00', booked: 'pending' }
  ],
};

const timeslots = ['9:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '12:00 - 01:00', '01:00 - 02:00', '02:00 - 03:00', '03:00 - 04:00'];

const Calendar = () => {
  const [visibleStartDate, setVisibleStartDate] = useState(new Date());
  const visibleEndDate = new Date(visibleStartDate);
  visibleEndDate.setDate(visibleEndDate.getDate() + 6);

  const handleSwipe = (direction) => {
    const increment = direction === 'next' ? 7 : -7;
    const newStartDate = new Date(visibleStartDate);
    newStartDate.setDate(visibleStartDate.getDate() + increment);
    setVisibleStartDate(newStartDate);
  };

  const handleTimeSlotClick = (date, timeslot) => {
    console.log(`Timeslot ${timeslot} on ${date} clicked.`);
  };

  const visibleRange = getNextSevenDays(visibleStartDate);

  return (
    <section className='container'>
      <div className="calendar-container">
        <div className="calendar-header">
          <IoIosArrowBack className="arrow-icon" onClick={() => handleSwipe('prev')} />
          <div className="month-range">{new Date(visibleStartDate).toLocaleString('default', { month: 'long' })} {new Date(visibleStartDate).getDate()} - {new Date(visibleEndDate).toLocaleString('default', { month: 'long' })} {new Date(visibleEndDate).getDate()}</div>
          <IoIosArrowForward className="arrow-icon" onClick={() => handleSwipe('next')} />
        </div>
        <div className="calendar">
          {visibleRange.map((item, index) => (
            <div key={index} className={`calendar-date ${item.clickable ? 'clickable' : 'unclick'}`}>
              <p>{item.date}</p>
              {timeslots.map((timeslot, idx) => {
                const dateData = data[item.date] || [];
                const timeslotData = dateData.find(slot => slot.starttime === timeslot.split(' - ')[0]);
                const slotStatus = timeslotData ? timeslotData.booked : 'available';
                return (
                  <div key={idx} className={`timeslot ${item.clickable ? 'clickable' : 'unclick'} ${slotStatus}`} onClick={() => item.clickable && handleTimeSlotClick(item.date, timeslot)}>
                    <p>{timeslot}</p>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Calendar;
