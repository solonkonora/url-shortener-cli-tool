const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('clitool', 'nkwada', 'norash', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;