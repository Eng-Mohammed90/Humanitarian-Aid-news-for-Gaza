const app = require("./app");
const dotenv = require("dotenv");

// تحميل متغيرات البيئة
dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});