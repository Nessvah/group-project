require("dotenv").config();
const mongoose = require("mongoose");

/**
 * This function will invoke mongoose to connect to our database
 * @params void
 * @returns the connection when successful
 *
 */

const connectingDb = async () => {
  try {
    // connecting to the db url

    const conn = await mongoose.connect(
      process.env.DB_URL,
      // When entering our password, we need to make sure special characters are URL encoded.
      {
        useNewUrlParser: true,
      }
    );

    console.log(`MongoDB successfully connected.`);
    return conn;
  } catch (e) {
    // catching potential errors so that our server doesn't crash
    console.error(e.message);
  }
};

/**
 * Function to disconnect from database
 * @params void
 * @returns void
 *
 */

const disconnectDb = async () => {
  await mongoose.disconnect();
  console.log(`Disconnecting...`);
};

module.exports = {
  connectingDb,
  disconnectDb,
};
