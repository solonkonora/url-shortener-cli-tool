#! /usr/bin/env node
//console.log("Hello World This is the first program!");

//creating objects with command line flag
const { program } = require('commander');
const { Pool } = require('pg');

// Create a PostgreSQL pool
const pool = new Pool({
    user: 'nkwada',
    host: 'localhost',
    database: 'clitool',
    password: 'norash',
    port: 5432,
});

// 1) Simulating a list of shortened URLs
program
    .option('-l, --list', 'List all shortened URLs')
    .parse(process.argv);

if (program.list) {
    console.log('Your shortened URLs:');
    listShortenedURLs.forEach((shortURL) => {
        console.log(`ID: ${shortURL.id}, URL: ${shortURL.url}`);
    });
}

// 2) Allow the user to be able to see how to use our CLI tool (for example: --help)

program
    .version('1.0.0')
    .description('URL Shortener CLI Tool')
    .command('shorten <url>')
    .description('Shorten a long URL')
    .action(async (url) => {
        const shortenedURL = await generateShortURL(url);
        console.log(`Shortened URL: ${shortenedURL}`);
    });

async function generateShortURL(url) {
    const client = await pool.connect();
    try {
        // Insert the long URL into the database and retrieve the generated short URL
        const query = 'INSERT INTO urls (long_url) VALUES ($1) RETURNING short_url';
        const values = [url];
        const result = await client.query(query, values);
        return result.rows[0].short_url;
    } finally {
        client.release();
    }
}

// retrieves short_urls from the database and display on the console
async function listShortenedURLs() {
    const client = await pool.connect();
    try {
      const query = 'SELECT id, short_url, long_url FROM urls';
      const result = await client.query(query);
  
      console.log('Your shortened URLs:');
      result.rows.forEach((row) => {
        console.log(`ID: ${row.id}, Short URL: ${row.short_url}, Long URL: ${row.long_url}`);
      });
    } finally {
      client.release();
    }
  }



program.parse(process.argv);

if (program.help) {
    program.outputHelp();
}