require("dotenv").config(); // this code will inject our variables right at the start
const express = require("express");
const { connectingDb, disconnectDb } = require("./models/connection");
const { registrationRoute } = require("./routes/registrationRoute");
const { verifyEmailRoute } = require("./routes/emailVerification");

const app = express();

// parses incoming requests with JSON payloads
app.use(express.json());
// parses incoming requests with URL-encoded payloads
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ msg: "Everything is working!" });
});

// Route for the registration
app.use("/api/registration", registrationRoute);
// Route for email verification
app.use("/api/verify", verifyEmailRoute);

// running the server on the specified port
const server = app.listen(process.env.PORT, async () => {
  // connecting to the db
  await connectingDb();
  console.log(`Server listening on ${process.env.PORT}`);
});

// this will trigger whenever the server is closed
server.on("close", async () => {
  console.log("Disconnecting....");
  // when server is closed, so is the db connection
  await disconnectDb();
});
