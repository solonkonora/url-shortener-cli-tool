const { program } = require('commander');
const { Sequelize, DataTypes } = require('sequelize');
const axios = require('axios').default;


const sequelize = new Sequelize('clitool', 'nkwada', 'norash', {
  host: 'localhost',
  dialect: 'postgres',
});

const Url = sequelize.define('url', {
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


async function generateShortURL(url) {
  try {
    const cleanUriEndpoint = 'https://cleanuri.com/api/v1/shorten';

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

async function listShortenedURLs() {
  const shortenedURLs = await Url.findAll({
    attributes: ['id', 'short_url'] // Exclude createdAt and updatedAt columns wh is the cause for the additional 2 columns displayed on the console
  });
  let output = 'Your shortened URLs:\n';
  shortenedURLs.forEach((shortURL) => {
    output += `ID: ${shortURL.id}, URL: ${shortURL.short_url}\n`;
  });
  console.log(output);
}

program.parse(process.argv);