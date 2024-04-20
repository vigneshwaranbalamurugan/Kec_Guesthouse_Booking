import nodemailer from 'nodemailer';

const verificationStore = new Map();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'vigneshsobalamurugan2005@gmail.com', 
      pass: 'fsum hfnq rlns oyms',
    },
  });

const sendConfirmationEmail = (email, verificationCode) => {
    const mailOptions = {
      from: 'vigneshsobalamurugan2005@gmail.com',
      to: email,
      subject: 'Account Verification',
      text: `This Message is From Kongu Events Hub Because of you have Registered In our Portal,\n
      Your email: ${email},\n
      Your verification code is: ${verificationCode}`,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  };

const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };


export {verificationStore,sendConfirmationEmail,generateVerificationCode};