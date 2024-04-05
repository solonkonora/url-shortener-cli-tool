const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('clitool', 'nkwada', 'norash', {
//   host: 'localhost',
//   dialect: 'postgres',
// });
const sequelize = new Sequelize({

  dialect: 'postgres',
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.port
});

module.exports = sequelize;