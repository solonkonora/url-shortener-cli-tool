import Url from '../schema/urlss.js';

async function listShortenedURLs() {
  const shortenedURLs = await Url.findAll({
    attributes: ['id', 'short_url'], // Exclude createdAt and updatedAt columns
});
let output = 'Your shortened URLs:\n';
shortenedURLs.forEach((shortURL) => {
  output += `ID: ${shortURL.id}, URL: ${shortURL.short_url}\n`;
});
console.log(output);
}


export default listShortenedURLs;
