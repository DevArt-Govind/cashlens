const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');

// Simple auth middleware for dev
function authMiddleware(req, res, next) {
  const user = JSON.parse(req.headers['user'] || 'null'); // dev-only
  if (!user) return res.status(401).json({ message: 'Unauthorized' });
  req.user = user;
  next();
}

// Apply middleware to all transaction routes
router.use(authMiddleware);

// Delete transaction
router.delete('/:id', async (req, res) => {
  await Transaction.destroy({ where: { id: req.params.id } });
  res.json({ message: 'Transaction deleted' });
});

// Update a transaction
router.put('/:id', async (req, res) => {
  console.log('PUT body:', req.body); // <-- add this

  try {
    const { title, amount, type, datetime } = req.body;
    const transactionId = req.params.id;

    const [updatedCount] = await Transaction.update(
      { title, amount, type, datetime },
      { where: { id: transactionId } }
    );

    if (updatedCount === 0) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    const updatedTransaction = await Transaction.findByPk(transactionId);
    res.json(updatedTransaction);
  } catch (err) {
    console.error('Error updating transaction:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// disconnecting DB

const isDev = process.env.DEV_MODE === 'false';
// / 🔸 Store dynamic user data in memory (cleared when server restarts)
let tempTransactions = [];

router.get('/', async (req, res) => {
  if (isDev) {
    return res.json(tempTransactions);
  }

  try {
    const user = req.user;
    const transactions = await Transaction.findAll({ where: { userId: user.id } });
    res.json(transactions);
  } catch (err) {
     console.error('Error fetching transactions:', err);
    res.status(500).json({ error: 'DB error: ' + err.message });
  }
});

router.post('/', async (req, res) => {

  if (isDev) {
    const newTx = {
      id: Date.now(),
      ...req.body
    };
    tempTransactions.push(newTx);
    return res.status(201).json(newTx);
  }

  try {
    const user = req.user; 
     if (!user) {
      return res.status(401).json({ message: 'Unauthorized: user not logged in' });
    }
    const transaction = await Transaction.create({...req.body, userId: user.id });
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ error: 'DB error: ' + err.message });
  }
});

// disconnecting DB end




module.exports = router;
