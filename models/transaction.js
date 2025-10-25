const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');

const Transaction = sequelize.define('Transaction', {
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