require('dotenv').config(); // Load variables from .env file
const mongoose = require('mongoose');

mongoose.set('strictQuery', false); // Set strictQuery to false

async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

module.exports = connect;
