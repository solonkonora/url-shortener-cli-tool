const { program } = require('commander');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('clitool', 'nkwada', 'norash', {
  host: 'localhost',
  dialect: 'postgres',
});

const Url = sequelize.define('Url', {
  longUrl: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  shortUrl: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
  },
});

program
  .version('1.0.0')
  .description('URL Shortener CLI Tool');

program
  //.command('shorten <url>', { name: 'shorten' })
  .command('shorten <url>')
  .description('Shorten a URL')
  .action(async (url) => {
    const shortenedURL = await generateShortURL(url);
    console.log(`Shortened URL: ${shortenedURL}`);
  });

program
  .command('list')
  .description('List all shortened URLs')
  .action(async () => {
    await listShortenedURLs();
  });

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateRandomString(length) {
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}

async function generateShortURL(url) {
  try {
    let shortUrl;
    let isUnique = false;
    while (!isUnique) {
      shortUrl = generateRandomString(8); // Generate a random string of length 8
      const existingUrl = await Url.findOne({ where: { shortUrl } });
      if (!existingUrl) {
        isUnique = true;
      }
    }
    const shortenedURL = await Url.create({
      longUrl: url,
      shortUrl: shortUrl,
    });
    return shortenedURL.shortUrl;
  } catch (error) {
    console.error('Error creating shortened URL:', error);
  }
}

async function listShortenedURLs() {
  try {
    const shortenedURLs = await Url.findAll();
    console.log('Your shortened URLs:');
    shortenedURLs.forEach((shortURL) => {
      console.log(`ID: ${shortURL.id}, URL: ${shortURL.longUrl}`);
    });
  } catch (error) {
    console.error('Error retrieving shortened URLs:', error);
  }
}

program.parse(process.argv);