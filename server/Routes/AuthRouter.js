import express from 'express';
import User from '../Models/UserModel.js';
import admin from '../Models/AdminModel.js';
import bcrypt from 'bcryptjs';
import bodyParser from 'body-parser';
import { verificationStore, sendConfirmationEmail, generateVerificationCode } from './Verify-Email.js';

const authRouter = express.Router();

authRouter.post('/verify-account', (req, res) => {
  const { email, code } = req.body;

  const storedCode = verificationStore.get(email);

  if (storedCode && storedCode == code) {
    res.send('Account verified!');
    verificationStore.delete(email);
  } else {
    res.status(400).send('Invalid verification code');
  }
});

authRouter.post('/register', async (req, res) => {
  try {
    const { email, society, password } = req.body;
    console.log(email);
    const existingUser = await User.findOne({
      $or: [
        { email: email },
        { society: society }
      ]
    });


    if (existingUser) {
      return res.status(400).json({ message: 'Username or mobile number already exists' });
    }

    const verificationCode = generateVerificationCode();
    verificationStore.set(email, verificationCode);
    sendConfirmationEmail(email, verificationCode);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      society,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully And Confirmation mail Sent to your Mail' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

authRouter.post('/login', async (req, res) => {
  const { userType, email, password } = req.body;
  if (userType == 'User') {
    try {
      const user = await User.findOne({ email });
      console.log(user.email);
      console.log(user.society);
      console.log(user.password);
      const storedCode = verificationStore.get(email);
      console.log(storedCode);
      if (storedCode) {
        return res.status(401).json({ message: 'Account Not Veified' });
      }

      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const data = JSON.stringify(user);
      return res.status(200).send(data);
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  else if (userType == 'Admin') {
    try {
      // console.log('welcome admin');
      // const salt = await bcrypt.genSalt(10);
      // const hashedPassword = await bcrypt.hash('1234', salt);
      // const dept='cse';
      // const newUser = new admin({
      //   email,
      //   dept,
      //   password: hashedPassword,
      // });

      // await newUser.save();
      const admi = await admin.findOne({ email });
      if (!admi || !bcrypt.compareSync(password, admi.password)) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const data = JSON.stringify(admi);
      return res.status(200).send(data);

    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
});



export default authRouter;