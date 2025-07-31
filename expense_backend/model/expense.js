import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String },
  date: { type: Date,required:true, default: Date.now }
});

const Expense = mongoose.model('Expense', expenseSchema);

export default Expense;
