const { Sequelize } = require('sequelize');
require('dotenv').config();

// const sequelize = new Sequelize('clitool', 'nkwada', 'norash', {
//   host: 'localhost',
//   dialect: 'postgres',
// });

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: 'postgres',
    host: process.env.DB_HOST,

  });

sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
    // program.parse(process.argv);
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

module.exports = sequelize;