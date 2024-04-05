//api https://cleanuri.com/api/v1/shorten

// const sequelize = new Sequelize('clitool', 'nkwada', 'norash', {
//   host: 'localhost',
//   dialect: 'postgres',
// });

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('clitool', 'nkwada', 'norash', {
  host: 'localhost',
  dialect: 'postgres',
});

// const sequelize = new Sequelize({
//   dialect: 'postgres',
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   port: process.env.PORT
// });

sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
    // program.parse(process.argv);
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

module.exports = sequelize;