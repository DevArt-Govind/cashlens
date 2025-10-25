require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const Transaction = require('./models/transaction');
const User = require('./models/user');
const transactionRoutes = require('./routes/transactionRoutes');
const userRoutes = require('./routes/userRoutes');
const budgetRoutes = require('./routes/budgetRoutes');
const Budget = require('./models/budget');


const app = express();
// const PORT = 3000;

// Middleware
// app.use(cors());
app.use(bodyParser.json());
// 🧩 CORS setup
const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:4200'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Routes
app.use('/api/transactions', transactionRoutes);
app.use('/api/users', userRoutes);
app.use('/api/budgets', budgetRoutes);

// DB Sync and Server Start
// sequelize.sync({ alter: true }) // auto creates tables and columns if missing
//   .then(() => {
//     console.log('MySQL connected and synced');
//     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//   })
//   .catch(err => console.error('DB Connection Error:', err));

// One user has many transactions
User.hasMany(Transaction, { foreignKey: 'userId', onDelete: 'CASCADE' });
// Each transaction belongs to a user
Transaction.belongsTo(User, { foreignKey: 'userId' });


// new association
User.hasOne(Budget, { foreignKey: 'userId' });
Budget.belongsTo(User, { foreignKey: 'userId' });



// const isDev = process.env.DEV_MODE === 'true';

// if (!isDev) {
//    // Production or staging
//   sequelize.sync({alter: true})
//     .then(() => {
//       console.log('MySQL connected and synced');
//       app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//     })
//     .catch(err => console.error('DB Connection Error:', err));
// } else {
//   // Local dev mode
//    sequelize.sync({ force: true }) // or no force!
//     .then(() => {
//       console.log('🧪 DEV_MODE active: Using local DB schema (no drop)');
//       app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//     });
// }

// module.exports = {
//   User,
//   Budget,
//   Transaction
// };

const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true })
  .then(() => {
    console.log('✅ Database synced successfully.');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => console.error('❌ DB Sync Error:', err));

module.exports = app;