// const { Sequelize } = require('sequelize');
// const ShortUrl = require('./models/short-url.js')(sequelize, Sequelize);
// const validUrl = require('valid-url').isUri;

// const sequelize = new Sequelize('postgres://username:password@localhost:5432/dbname', {
//   dialect: 'postgres',
//   dialectOptions: {
//     ssl: false, // Set to true if using SSL
//   },
// });

// async function fetchShortUrls() {
//   try {
//     const shortUrlRecords = await ShortUrl.findAll();
//     console.log(shortUrlRecords);
//   } catch (err) {
//     console.log(err);
//   }
// }

// async function createShortUrl(fullUrl) {
//   if (!validUrl(fullUrl)) {
//     console.log('Invalid base URL!');
//     return;
//   }

//   try {
//     await ShortUrl.create({ full: fullUrl });
//     console.log('Short URL created successfully!');
//   } catch (err) {
//     console.log(err);
//   }
// }

// async function main() {
//   await sequelize.sync(); // Sync the models with the database

//   // Usage examples
//   await fetchShortUrls();
//   await createShortUrl('https://example.com');
// }

// main();

