#! /usr/bin/env node
const { program } = require('commander');
const { runCLI } = require('../commands/shorten.js');
const sequelize = require('../db_sequelize.js'); 
const axios = require('axios');
require('dotenv').config();

program
  .name('url-shortener-cli-tool') 
//   .version('1.0.0') 
  .description('URL Shortener CLI Tool');

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
    //program.parse(process.argv);
    runCLI();
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

 //program.parse(process.argv);

