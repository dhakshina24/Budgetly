import express from 'express';
const app = express();
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import Transaction from './models/transaction.js';
import mongoose from 'mongoose';

app.use(express.json());
app.use(cors());

app.post('/api/transaction', async (req,res) => {
  
  await mongoose.connect(process.env.MONGO_URL);
  const {price, name, description, dateTime} = req.body;
  console.log("Received transaction:", name, description, dateTime, price);
  const transaction = await Transaction.create({name, description, dateTime, price});
  res.json({succes:true, transaction});  
}); 

app.get('/api/transaction', async (req,res)=>{
  await mongoose.connect(process.env.MONGO_URL);
  const transaction = await Transaction.find({});
  res.json(transaction);
});
app.listen(4040);