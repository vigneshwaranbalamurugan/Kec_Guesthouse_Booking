import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  timeSlots: [
    {
      startTime: {
        type: String,
        default: "9:00 AM"
      },
      endTime: {
        type: String,
        default: "10:00 AM"
      },
      booked: {
        type: String,
        default: "empty"
      },
      email: {
        type: String,
        default: null,
      },
      eventName: {
        type: String,
        default: null
      },
      subName: {
        type: String,
        default: null
      }
    },
    {
      startTime: {
        type: String,
        default: "10:00 AM"
      },
      endTime: {
        type: String,
        default: "11:00 AM"
      },
      booked: {
        type: Boolean,
        default: false
      },
      email: {
        type: String,
        default: null,
      },
      eventName: {
        type: String,
        default: null
      },
      subName: {
        type: String,
        default: null
      }
    },
    {
      startTime: {
        type: String,
        default: "11:00 AM"
      },
      endTime: {
        type: String,
        default: "12:00 AM"
      },
      booked: {
        type: Boolean,
        default: false
      },
      email: {
        type: String,
        default: null,
      },
      eventName: {
        type: String,
        default: null
      },
      subName: {
        type: String,
        default: null
      }
    },
    {
      startTime: {
        type: String,
        default: "12:00 PM"
      },
      endTime: {
        type: String,
        default: "1:00 PM"
      },
      booked: {
        type: Boolean,
        default: false
      },
      email: {
        type: String,
        default: null,
      },
      eventName: {
        type: String,
        default: null
      },
      subName: {
        type: String,
        default: null
      }
    },
    {
      startTime: {
        type: String,
        default: "01:00 PM"
      },
      endTime: {
        type: String,
        default: "02:00 PM"
      },
      booked: {
        type: Boolean,
        default: false
      },
      email: {
        type: String,
        default: null,
      },
      eventName: {
        type: String,
        default: null
      },
      subName: {
        type: String,
        default: null
      }
    },
    {
      startTime: {
        type: String,
        default: "02:00 PM"
      },
      endTime: {
        type: String,
        default: "03:00 PM"
      },
      booked: {
        type: Boolean,
        default: false
      },
      email: {
        type: String,
        default: null,
      },
      eventName: {
        type: String,
        default: null
      },
      subName: {
        type: String,
        default: null
      }
    },
    {
      startTime: {
        type: String,
        default: "03:00 PM"
      },
      endTime: {
        type: String,
        default: "04:00 PM"
      },
      booked: {
        type: Boolean,
        default: false
      },
      email: {
        type: String,
        default: null,
      },
      eventName: {
        type: String,
        default: null
      },
      subName: {
        type: String,
        default: null
      }
    }
  ]
});

export default bookingSchema;