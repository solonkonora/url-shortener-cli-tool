import { program } from 'commander';
import axios from 'axios';
import Url from '../schema/urlss.js';
import listShortenedURLs from '../commands/list.js';
import { config } from 'dotenv';
config();

export function runCLI() {
  program
    .version('1.0.0')
    .description('URL Shortener CLI Tool');

  program
    .command('shorten <url>')
    .description('Shorten a URL')
    .action(async (url) => {
      try {
        const shortenedURL = await generateShortURL(url);
        console.log(`Shortened URL: ${shortenedURL}`);
      } catch (error) {
        console.error('Error generating shortened URL:', error.message);
      }
    });

  program
    .command('list')
    .description('List all shortened URLs')
    .action(async () => {
      try {
        await listShortenedURLs();
      } catch (error) {
        console.error('Error retrieving shortened URLs:', error);
      }
    });

  program.parse(process.argv);
}

async function generateShortURL(url) {
  try {
    const cleanUriEndpoint = process.env.API_KEY;
    const response = await axios.post(cleanUriEndpoint, {
      url: url
    });
    const shortenedURL = response.data.result_url;


    // creatx new row in urls table and storing the links to it in the db
    const createdUrl = await Url.create({
      long_url: url,
      short_url: shortenedURL
    });

    return createdUrl.short_url;



  } catch (error) {
    console.error('Error generating shortened URL:', error);
    throw error;
  }
}

export default runCLI;