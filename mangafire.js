const axios = require('axios');
const cheerio = require('cheerio');

module.exports = {
  id: "mangafire",
  name: "MangaFire",
  search: async (query) => {
    const searchUrl = `https://mangafire.to/search?keyword=${encodeURIComponent(query)}`;
    const { data } = await axios.get(searchUrl);
    const $ = cheerio.load(data);
    const results = [];

    $('.manga-poster').each((i, el) => {
      const title = $(el).find('img').attr('alt');
      const cover = $(el).find('img').attr('data-src');
      const link = "https://mangafire.to" + $(el).find('a').attr('href');
      results.push({ title, cover, link });
    });

    return results;
  }
};
