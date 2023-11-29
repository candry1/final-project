// config.js
const dotenv = require("dotenv");
dotenv.config();
// Export env variables
module.exports = {
  API_KEY: process.env.API_KEY,
  API_SECRET: process.env.API_SECRET,
  TICKET_MASTER_API_KEY: process.env.TICKET_MASTER_API_KEY,
  TICKET_MASTER_API_SECRET: process.env.TICKET_MASTER_API_SECRET,
  TEST_MODE: process.env.TEST_MODE,
};
