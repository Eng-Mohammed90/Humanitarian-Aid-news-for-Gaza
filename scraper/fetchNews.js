const axios = require("axios");
const cheerio = require("cheerio");
const News = require("../models/News");

const fetchNews = async () => {
  const baseUrl = "https://www.motqdmon.com/search/label/المساعدات";
  const maxPages = 10;
  const maxResults = 10;

  for (let page = 0; page < maxPages; page++) {
    const start = page * maxResults;
    const url = `${baseUrl}?&start=${start}&max-results=${maxResults}`;
    console.log("Fetching:", url);

    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const newsArr = [];

    $(".post-title.entry-title a").each((_, el) => {
      const title = $(el).text().trim();
      if (!title) return;

      let dateText = $(el)
        .parents("article")
        .find("time")
        .attr("datetime");

 
      const date = dateText ? new Date(dateText) : new Date();

      newsArr.push({
        title,
        date,
        likes: 0
      });

      console.log("Collected:", title);
    });

    for (const news of newsArr) {
      try {
        const exists = await News.findOne({ title: news.title });
        if (exists) {
          continue;
        }

        await News.create(news);
        console.log("Saved:", news.title);
      } catch (err) {
        console.error("Insert error:", err.message);
      }
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log("Scraping finished");
};

module.exports = fetchNews;
