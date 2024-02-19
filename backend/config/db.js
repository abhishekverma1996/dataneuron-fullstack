const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set('strictQuery', false);

const MONGO_URL = process.env.MONGO_URL;

const connection = mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error.message);
  });

module.exports = {
	connection
};
