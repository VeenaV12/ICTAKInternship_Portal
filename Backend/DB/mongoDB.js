const mongoose = require('mongoose');

const mongoURI = process.env.MONGODB_URL;

const options = {
  serverSelectionTimeoutMS: 10000, // Adjust the time in milliseconds (e.g., 10 seconds)
  socketTimeoutMS: 45000,          // Adjust the time in milliseconds (e.g., 45 seconds)
};

mongoose.connect(mongoURI, options)
  .then(() => {
    console.log('Connected to DB');
  })
  .catch((error) => {
    console.error('Error connecting to DB:', error);
  });
