'use strict';

const cheerio = require('cheerio');
const axios = require('axios');

const searchZiyuan = async (ctx, search) => {
  if (!search.keywords) return [];
  const url = `http://www.kukan6.com/index.php?s=search-index-wd-${encodeURI(search.keywords)}-sid-1`;

  const dataList = [];
  const response = await axios.get(url, {
    // headers: { 'User-Agent': userAgent.random() },
  });
  const $ = cheerio.load(response.data, {
    ignoreWhitespace: true,
    normalizeWhitespace: true,
  });

  try {
    const items = $('.show-list li');
    items.each((i, element) => {
      const url = `http://www.kukan6.com${$(element).find('.play-img').attr('href')}`;
      const title = $(element).find('h5 a').text();
      const cover = $(element).find('img').attr('src');
      dataList.push({
        url,
        title,
        cover,
      });
    });

    return dataList;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  searchZiyuan,
};
