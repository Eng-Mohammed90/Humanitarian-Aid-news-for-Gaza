const { Router } = require("express");
const {getAllNews,addLike} = require("../controllers/news.controller");

const router = Router();

// GET /news?search=&page=&limit=&sort=asc|desc
router.get("/", getAllNews);

// POST /news/:id/like
router.post("/:id/like", addLike);

module.exports = router;
