const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');// your Sequelize connection

const Budget = sequelize.define('Budget', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  monthlyBudget: {type: DataTypes.DECIMAL(10, 2), allowNull: false },
  userId: { type: DataTypes.INTEGER, allowNull: false }
}, {
  tableName: 'budgets',
  timestamps: true
});


module.exports = Budget;