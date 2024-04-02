#! /usr/bin/env node
//console.log("Hello World This is the first program!");
// import { program } from 'commander';

//creating objects with command line flag
const { program } = require('commander');

// 1) Simulating a list of shortened URLs
const shortenedURLs = [
    { id: 1, url: 'https://example.com/shorturl1' },
    { id: 2, url: 'https://example.com/shorturl2' },
    { id: 3, url: 'https://example.com/shorturl3' },
];

program
    .option('-l, --list', 'List all shortened URLs')
    .parse(process.argv);

if (program.list) {
    console.log('Your shortened URLs:');
    shortenedURLs.forEach((shortURL) => {
        console.log(`ID: ${shortURL.id}, URL: ${shortURL.url}`);
    });
}


// 2) allow the user to be able to see how to use our cli tool ( for example : --help )

program
  .version('1.0.0')
  .description('URL Shortener CLI Tool')
  .command('shorten <url>')
  .description('Shorten a long URL')
  .action((url) => {
    // Implement URL shortening logic here
    console.log(`Shortened URL: [shortened-url]`);
  });



program.parse(process.argv);

if (program.help) {
    program.outputHelp();
}