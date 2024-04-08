import { Sequelize, DataTypes } from 'sequelize';
import { config } from 'dotenv';
config();


const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: 'postgres',
    host: process.env.DB_HOST,
  }
);

const Url = sequelize.define('Url', {
  long_url: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true, // The long_url cannot be empty
    },
  },
  short_url: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true, // The short_url cannot be empty
    },
  },
}, {
  tableName: 'urls',
  timestamps: false, // Disable timestamps createdAt & updatedAt
});

export default Url;