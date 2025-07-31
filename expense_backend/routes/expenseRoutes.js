import express from 'express';
import Expense from '../model/expense.js';

const router = express.Router();

// Create expense
router.post('/', async (req, res) => {
  try {
    const expense = new Expense(req.body);
    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Get all expenses OR filter by date range
router.get('/', async (req, res) => {
  try {
    const { from, to } = req.query;

    let filter = {};
    if (from && to) {
      filter.date = {
        $gte: new Date(from),
        $lte: new Date(to),
      };
    }

    const expenses = await Expense.find(filter).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update expense
router.put('/:id', async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!expense) return res.status(404).json({ error: 'Not found' });
    res.json(expense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete expense
router.delete('/:id', async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE all expenses
router.delete('/', async (req, res) => {
  try {
    await Expense.deleteMany({});
    res.status(200).json({ message: 'All expenses deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting all expenses', error });
  }
});

export default router;
