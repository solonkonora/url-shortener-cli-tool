const { Sequelize, DataTypes } = require('sequelize');

const ShortUrl = Sequelize.define('ShortUrl', {
    full: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    short: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: Sequelize.fn('uuid_generate_v4') // Replace with PostgreSQL UUID generation function
    },
    clicks: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    }
});

module.exports = ShortUrl;