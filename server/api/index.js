const app = require("../app");
const connectDB = require("../config/db");

// Wrap Express app in Vercel handler
let isConnected = false;

module.exports = async (req, res) => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
  app(req, res);
};
