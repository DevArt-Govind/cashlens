const User = require('./user');
const Budget = require('./budget');
const Transaction = require('./transaction');

// Associations
User.hasOne(Budget, { foreignKey: 'userId' });
Budget.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Transaction, { foreignKey: 'userId' });
Transaction.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  User,
  Budget,
  Transaction
};