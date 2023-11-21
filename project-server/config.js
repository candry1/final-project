// config.js
const dotenv = require("dotenv");
dotenv.config();
// Export env variables
module.exports = {
  API_KEY: process.env.API_KEY,
  API_SECRET: process.env.API_SECRET,
  TEST_MODE: process.env.TEST_MODE,
};
