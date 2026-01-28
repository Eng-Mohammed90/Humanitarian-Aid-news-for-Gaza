const News = require("../models/News");
const createError = require("http-errors");


const getAllNews = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      sort = "desc",
      search,
      from,
      to
    } = req.query;

    const query = {};

   
    if (search) {
      const parsedDate = new Date(search);

      if (!isNaN(parsedDate.getTime())) {
        const startOfDay = new Date(parsedDate);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(parsedDate);
        endOfDay.setHours(23, 59, 59, 999);

        query.date = {
          $gte: startOfDay,
          $lte: endOfDay
        };
      } else {
        query.title = { $regex: search, $options: "i" };
      }
    }

    //  فلترة من  إلى
    if (from || to) {
      query.date = query.date || {};

      if (from) {
        const fromDate = new Date(from);
        fromDate.setHours(0, 0, 0, 0);
        query.date.$gte = fromDate;
      }

      if (to) {
        const toDate = new Date(to);
        toDate.setHours(23, 59, 59, 999);
        query.date.$lte = toDate;
      }
    }

    const skip = (page - 1) * limit;

    const news = await News.find(query)
      .sort({ date: sort === "asc" ? 1 : -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await News.countDocuments(query);

    res.json({
      status: true,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      data: news
    });
  } catch (err) {
    next(createError(500, err.message));
  }
};


// POST /news/:id/like
const addLike = async (req, res, next) => {
  try {
    const { id } = req.params;

    const news = await News.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!news) {
      return next(createError(404, "News not found"));
    }

    res.json({
      status: true,
      message: "Like added",
      likes: news.likes
    });
  } catch (err) {
    next(createError(500, err.message));
  }
};

module.exports = {
  getAllNews,
  addLike
};


// const News = require("../models/News");
// const createError = require("http-errors");

// // GET /news
// const getAllNews = async (req, res, next) => {
//   try {
//     const { page = 1, limit = 10, sort = "desc", search } = req.query;

//     const query = {};

//     //  البحث بالعنوان أو التاريخ
//     if (search) {
//       const parsedDate = new Date(search);
//       if (!isNaN(parsedDate.getTime())) {
//         query.date = parsedDate;
//       } else {
//         query.title = { $regex: search, $options: "i" };
//       }
//     }

//     const skip = (page - 1) * limit;

//     const news = await News.find(query)
//       .sort({ date: sort === "asc" ? 1 : -1 })
//       .skip(skip)
//       .limit(parseInt(limit));

//     const total = await News.countDocuments(query);

//     res.json({
//       status: true,
//       page: Number(page),
//       totalPages: Math.ceil(total / limit),
//       totalItems: total,
//       data: news
//     });
//   } catch (err) {
//     next(createError(500, err.message));
//   }
// };

// // POST /news/:id/like
// const addLike = async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     const news = await News.findByIdAndUpdate(
//       id,
//       { $inc: { likes: 1 } },
//       { new: true }
//     );

//     if (!news) {
//       return next(createError(404, "News not found"));
//     }

//     res.json({
//       status: true,
//       message: "Like added",
//       likes: news.likes
//     });
//   } catch (err) {
//     next(createError(500, err.message));
//   }
// };

// module.exports = {
//   getAllNews,
//   addLike
// };
