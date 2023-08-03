const express = require("express");
const { registerVisitor } = require("../controllers/registrationController");
const { validationMiddleware } = require("../middleware/validationMiddleware");
const { validateUser } = require("../models/visitorSchema");

// import the specific controllers for this routes

const router = express.Router();

// * Registration routes

// /registration/visitor
// this will receive a path, and a callback function
// to handle the requests and responses to this endpoint
router.post("/visitor", validationMiddleware(validateUser), registerVisitor);

// we will send an email with a token for the all registrations
// so they can verify the email provided
//router.post('/verify/:id/:token', verifyRegistration)

/**
 * TODO: Implement a route for a POST /registration/partner so that they can register
 */

module.exports = {
  registrationRoute: router,
};
