import express from 'express';
import User from '../Models/UserModel.js';
import bcrypt from 'bcryptjs';
import bodyParser from 'body-parser';

const adminRouter = express.Router();


export default adminRouter;