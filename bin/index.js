#! /usr/bin/env node
const { program } = require('commander');
const shortenCommand = require('../commands/shorten.js');
const sequelize = require('../db_sequelize.js'); 
require('dotenv').config();
// const { program } = require('../commands/shorten.js');

program
  .name('url-shortener-cli-tool') 
//   .version('1.0.0') 
  .description('URL Shortener CLI Tool');

//program.addCommand(shortenCommand);

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
    program.parse(process.argv);
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

  program.parse(process.argv);