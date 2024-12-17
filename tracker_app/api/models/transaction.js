import mongoose from 'mongoose';
const {Schema, model} = mongoose;

const TransactionSchema = new Schema({
  name:{type:String, required:true},
  price:{type:Number, required:true},
  description: {type:String, required:true},
  dateTime: {type:Date, required:true},
});

export const TransactionModel = model('Transaction', TransactionSchema);
export default TransactionModel;
