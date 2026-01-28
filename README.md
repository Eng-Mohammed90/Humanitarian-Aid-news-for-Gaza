Gaza Aid News API:


A small web project that collects and displays the latest humanitarian aid news related to Gaza.
The application automatically scrapes aid news from Motqdmon website and provides them through a RESTful API.




Technologies Used:


-Node.js
-Express.js
-MongoDB + Mongoose
-Axios
-Cheerio




API Endpoints:


1. Get http:\\localhost:5000\news : To view all news.

     you can use these params with it to do operations like Search, Sort and filtering:
   
     for example:
   
                /news?page=1&limit=10&sort=desc
   
                /news?search=2026-01-28
   
                /news?from=2026-01-20&to=2026-01-30


2.POST /news/:id/like : To add a like.




To RUN the project:


1.Install Nodejs and npm libraries 

2. Create a ,env file:
   
PORT=5000

MONGO_URI=your_mongodb_connection_string

4. Run the server (node server.js)



Notes

1.Scraper runs automatically when the server starts

2.Likes are managed locally (not related to Motqdmon website)
