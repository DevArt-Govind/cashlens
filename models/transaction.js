const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');

const Transaction = sequelize.define('Transaction', {
  id: {
    type: DataTypes.BIGINT, // Change to BIGINT to handle large numbers
    primaryKey: true,       // Explicitly set as primary key
    allowNull: false,       // Ensure id is required
    // Remove autoIncrement if the frontend generates the id
  },
  title: { type: DataTypes.STRING, allowNull: false },
  amount: { type: DataTypes.FLOAT, allowNull: false },
  type: { type: DataTypes.STRING, allowNull: false }, // replaced ENUM
  datetime: { type: DataTypes.STRING, allowNull: false },
  // add userId as foreign key
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  timestamps: true,
  tableName: 'Transactions',
});


module.exports = Transaction;
