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

const isDev = process.env.DEV_MODE === 'true';

let sequelize;

if (isDev) {
  console.log('🧪 Using local database for development');
  sequelize = new Sequelize('finance_db', 'sa', 'bhardwajboy352', {
    host: 'localhost\\SQLEXPRESS',
    dialect: 'mssql',
    logging: console.log
  });
} else {
  console.log('🌐 Using Neon PostgreSQL');
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is missing. Add it in .env or Render Environment.');
  }

  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false
  });
}

// Test connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ DB connection failed:', error.message);
  }
})();

module.exports = sequelize;
