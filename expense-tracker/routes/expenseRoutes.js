const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// Add Expense
router.post('/', async (req, res) => {
  try {
    const expense = new Expense(req.body);
    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get All Expenses
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Expenses by Category
router.get('/category', async (req, res) => {
  try {
    const categoryExpenses = await Expense.aggregate([
      { $group: {
        _id: '$category',
        total: { $sum: '$amount' }
      }}
    ]);
    res.json(categoryExpenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;