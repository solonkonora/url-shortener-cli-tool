const { program } = require('commander');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('clitool', 'nkwada', 'norash', {
  host: 'localhost',
  dialect: 'postgres',
});

const Url = sequelize.define('url', {
  long_url: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true, // The long_url cannot be empty
    },
  },
  short_url: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true, // The short_url cannot be empty
    },
  },
}, {
  tableName: 'urls',
  timestamps: false, // Disable timestamps createdAt $ updateAt
});

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
    let attempt = 0;
    const maxAttempts = 10; // Maximum number of attempts to generate a unique short URL

    while (!isUnique && attempt < maxAttempts) {
      shortUrl = generateRandomString(10); // Generate a random string of length 8
      const existingUrl = await Url.findOne({ where: { short_url: shortUrl } });
      if (!existingUrl) {
        isUnique = true;
      }
      attempt++;
    }

    if (!isUnique) {
      throw new Error('Unable to generate a unique short URL.');
    }

    const shortenedURL = await Url.create({
      long_url: url,
      short_url: shortUrl,
    });
    return shortenedURL.short_url;
  } catch (error) {
    console.error('Error creating shortened URL:', error);
    throw error; // Rethrow the error to handle it at a higher level
  }
}



async function listShortenedURLs() {
  const shortenedURLs = await Url.findAll();
  console.log('Your shortened URLs:');
  shortenedURLs.forEach((shortURL) => {
    console.log(`ID: ${shortURL.id}, URL: ${shortURL.long_url}`);
  });
}

program.parse(process.argv);