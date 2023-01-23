const mongoose = require('mongoose');
require("dotenv").config()
const axios = require('axios');

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/WeeklyTable',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;