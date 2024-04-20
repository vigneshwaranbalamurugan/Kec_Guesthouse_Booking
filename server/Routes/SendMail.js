import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'vigneshsobalamurugan2005@gmail.com', 
      pass: 'fsum hfnq rlns oyms',
    },
  });


const sendEMail = (email, date,startTime,endTime,eventName,subName,status,reason='') => {
    const mailOptions = {
      from: 'vigneshsobalamurugan2005@gmail.com',
      to: email,
      subject: 'Registeration Status',
      text: `This Message is From Kongu Events Hub Because of your hall Registeration is ${status},\n
      Details:,\n
      Date:${date},\n
      Start Time:${startTime},\n
      End Time:${endTime},\n
      Event Name:${eventName},\n
      Sub name:${subName},\n
      Reason:${reason}
      `,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  };

  export default sendEMail;