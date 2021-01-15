'use strict';

const cheerio = require('cheerio');
const axios = require('axios');

const biqugeSearch = async (ctx, search) => {
  const dataList = [];
  try {
    const response = await axios.get(
      encodeURIComponent(
        `https://www.biquge.com.cn/search.php?q=${search.keywords}`
      ),
      {
        // headers: { 'User-Agent': userAgent.random() },
      }
    );
    const $ = cheerio.load(response.data, {
      ignoreWhitespace: true,
      normalizeWhitespace: true,
    });
    // 找到封面跟url
    const items = $('.result-list .result-game-item');
    items.each((i, element) => {
      const href = $(element)
        .find('.result-game-item-pic-link')
        .attr('href');
      const title = $(element)
        .find('.result-game-item-title-link')
        .text()
        .replace(/[ ]|\n/g, '');
      const author = $(element)
        .find('.result-game-item-info-tag span')
        .eq(1)
        .text();
      const jianjie = $(element).find('.result-game-item-desc').text();
      const cover = $(element).find('img').attr('src');
      dataList.push({
        url: `https://m.biquge.com.cn${href}`,
        title,
        author,
        cover,
        jianjie,
      });
    });

    // await page.close();
    // await ctx.app.pool.releaseHs(brower);
    return dataList;
  } catch (error) {
    console.log(error);
    // await page.close();
    // await ctx.app.pool.releaseHs(brower);
  }
};

module.exports = {
  biqugeSearch,
};
