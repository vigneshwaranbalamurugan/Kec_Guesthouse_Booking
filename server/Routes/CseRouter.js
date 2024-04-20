import mongoose from "mongoose";
import express from 'express';
import bodyParser from 'body-parser';
import bookingSchema from '../Models/Booked.js';
import sendEMail from "./SendMail.js";

const databaseName = 'cse';
const database = mongoose.connection.useDb(databaseName);
const collectionName = 'cloudcomputinglab';
const Booking = database.model(collectionName, bookingSchema);

const cseRouter = express.Router();

cseRouter.post('/handle-date', async (req, res) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const formattedYesterday = yesterday.toISOString().split('T')[0];
  await Booking.deleteOne({ date: formattedYesterday });
  const weekafter = new Date(today);
  weekafter.setDate(today.getDate() + 7);
  const formattedweek = weekafter.toISOString().split('T')[0];
  const newBooking = new Booking({
    date: formattedweek,
    timeSlots: [
      {
        startTime: "9:00 AM",
        endTime: "10:00 AM",
        booked: "empty",
        email: "null",
        eventName: "null",
        subName: "null"
      },
      {
        startTime: "10:00 AM",
        endTime: "11:00 AM",
        booked: "empty",
        email: "null",
        eventName: "null",
        subName: "null"
      },
      {
        startTime: "11:00 AM",
        endTime: "12:00 PM",
        booked: "empty",
        email: "null",
        eventName: "null",
        subName: "null"
      },
      {
        startTime: "12:00 PM",
        endTime: "1:00 PM",
        booked: "empty",
        email: "null",
        eventName: "null",
        subName: "null"
      },
      {
        startTime: "1:00 PM",
        endTime: "2:00 PM",
        booked: "empty",
        email: "null",
        eventName: "null",
        subName: "null"
      },
      {
        startTime: "2:00 PM",
        endTime: "3:00 PM",
        booked: "empty",
        email: "null",
        eventName: "null",
        subName: "null"
      },
      {
        startTime: "3:00 PM",
        endTime: "4:00 PM",
        booked: "empty",
        email: "null",
        eventName: "null",
        subName: "null"
      },
    ]
  });
  newBooking.save();
  res.send('Process sucessfull!');
});

cseRouter.post('/bookslot', async (req, res) => {
  const { date, startTimes, email, eventName, subName } = req.body;

  try {
    const existingBooking = await Booking.findOne({ date });

    if (!existingBooking) {
      return res.status(404).json({ message: 'Booking not found for the specified date' });
    }

    existingBooking.timeSlots.forEach(slot => {
      if (startTimes.includes(slot.startTime)) {
        if (slot.booked == "empty") {
          slot.booked = 'pending';
          slot.email = email;
          slot.eventName = eventName;
          slot.subName = subName;
        }
        else {
          res.status(500).json({ message: `${slot.startTime} Already Booked}` });

        }
      }
    });

    await existingBooking.save();

    res.status(200).json({ message: 'Booking updated successfully' });
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

cseRouter.get('/table', async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
})

cseRouter.get('/pending', async (req, res) => {
  Booking.find({ "timeSlots": { $elemMatch: { "booked": "pending" } } })
    .then(bookings => {
   
      const filteredBookings = bookings.map(booking => {
        const filteredTimeSlots = booking.timeSlots.filter(slot => slot.booked === "pending");
        return { ...booking.toObject(), timeSlots: filteredTimeSlots };
      });

     
      res.json(filteredBookings);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    });
});

cseRouter.post('/aprove', async (req, res) => {
  try {
    const { date, startTime, email } = req.body;
    const bookings = await Booking.find({ date });
    console.log(date);
    for (const booking of bookings) {
      const timeSlot = booking.timeSlots.find(slot => slot.startTime === startTime && slot.booked === 'pending');
      if (timeSlot) {
        const { startTime, endTime, eventName, subName } = timeSlot;
        sendEMail(email, date, startTime, endTime, eventName, subName, 'Approved');
        timeSlot.booked = 'approved';
      }
    }
    console.log('called');
    console.log(bookings);
  
    await Promise.all(bookings.map(booking => booking.save()));
    res.status(200).json({ message: 'Booking updated successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
})

cseRouter.post('/deny', async (req, res) => {
  try {
    const { date, startTime, email, reason } = req.body;
    const bookings = await Booking.find({ date });
    console.log(date);
    for (const booking of bookings) {
      const timeSlot = booking.timeSlots.find(slot => slot.startTime === startTime && slot.booked === 'pending');
      if (timeSlot) {
        const { startTime, endTime, eventName, subName } = timeSlot;
        sendEMail(email, date, startTime, endTime, eventName, subName, 'Rejected', reason);
        timeSlot.booked = 'empty';
      }
    }
    console.log('called');
    console.log(bookings);
    // Save all updated bookings
    await Promise.all(bookings.map(booking => booking.save()));
    res.status(200).json({ message: 'Booking updated successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
})
export default cseRouter;