const express = require('express');
const router = express.Router();
const Budget = require('../models/budget');
const User = require('../models/user');

// POST: Save or update budget
router.post('/', async (req, res) => {
  try {
    const userId = Number(req.body.userId);
    const { monthlyBudget=0 } = req.body;
    console.log('📩 Received userId:', userId, 'monthlyBudget:', monthlyBudget);

    let budget = await Budget.findOne({ where: { userId } });    
    console.log('🔍 Existing budget:', budget ? budget.toJSON() : null);
    if (budget) {
      budget.monthlyBudget = monthlyBudget;
      await budget.save();
      console.log('💾 Updated existing budget');
    } else {
      budget = await Budget.create({ userId, monthlyBudget });
      console.log('🆕 Created new budget');
    }
    res.json({ success: true, budget });
  } catch (err) {
    console.error('Error saving budget:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET: Fetch user's budget
router.get('/:userId', async (req, res) => {
  try {
    const budget = await Budget.findOne({
      where: { userId: req.params.userId },
    });

    if (!budget) {
      return res.json({ monthlyBudget: 0 });
    }

    res.json(budget);
  } catch (err) {
    console.error('Error fetching budget:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;