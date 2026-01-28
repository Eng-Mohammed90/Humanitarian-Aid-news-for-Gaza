const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const newsRoutes = require("./routes/news");

const saveNews = require("./scraper/fetchNews");



dotenv.config();


connectDB();

const app = express();


app.use(express.json()); 
app.use(morgan("dev"));


app.use("/news", newsRoutes);


app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Gaza Aid News API is running"
  });
});


saveNews()
  .then(() => console.log("Scraper finished fetching news"))
  .catch(err => console.error("Scraper failed:", err.message));
module.exports = app;

