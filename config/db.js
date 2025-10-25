// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('finance_db', 'sa', 'bhardwajboy352', {
//   host: 'localhost\\SQLEXPRESS',
//   dialect: 'mssql',
//   logging: console.log
// });

// module.exports = sequelize;


// // Test the connection
// async function testConnection() {
//   try {
//     await sequelize.authenticate();
//     console.log('✅ Connection has been established successfully.');
//   } catch (error) {
//     console.error('❌ Unable to connect to the database:', error);
//   }
// }
// testConnection();

// db disconnection
// if (process.env.DEV_MODE !== 'false') {
//   testConnection();
// } else {
//   console.log('🟡 DEV_MODE: Skipping testConnection');
// }
// testConnection();


// POSTGRES CONFIG
// config/db.js
require('dotenv').config();
const { Sequelize } = require('sequelize');

// Use DATABASE_URL from environment variables
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: { require: true, rejectUnauthorized: false },
  },
  logging: false, // set to console.log for debugging
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to Neon PostgreSQL successfully.');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
  }
}
testConnection();

module.exports = sequelize;