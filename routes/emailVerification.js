const express = require("express");
const {
  verifyEmailSentController,
} = require("../controllers/emailVerification");

const router = express.Router();

//* Email verification router

router.get("/:id/:token", verifyEmailSentController);

module.exports = {
    verifyEmailRoute: router
}
