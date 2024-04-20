import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import authRouter from './Routes/AuthRouter.js';
import cseRouter from './Routes/CseRouter.js';
import adminRouter from './Routes/AdminRouter.js';
import itRouter from './Routes/ItRouter.js';

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('Connected to db');
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
  });

app.use('/cse',cseRouter);
app.use('/auth',authRouter); 
app.use('/admin',adminRouter);
app.use('/it',itRouter);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '../client/public')));
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
