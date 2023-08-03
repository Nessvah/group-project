const crypto = require("crypto");
const { Visitor } = require("../models/visitorSchema");
const { Token } = require("../models/tokenSchema");
const { sendgridEmail } = require("../utils/sendgridEmail");



/**
 *  This controller will get all the information needed for the visitor to signup and
 *  save them into the db IF the email provided doesn't have already an account associated
 * After that will generate a token and will save that into the db associated with user id
 * @param {*} req  - the request object
 * @param {*} res - the response object
 * @returns
 */

const registerVisitor = async (req, res) => {
  try {
    // first we need to grab all the info that they will pass into the form
    // when registering
    const { name, password, email, isSubscribed, gender, dateOfBirth, city } =
      req.body;

    //then we need to check if the email is already in use or not (email must be unique in the db)
    let user = await Visitor.findOne({ email });

    //if the email already exists - send 409 - conflict and point to the error that the user can solve
    if (user) {
      res.status(409);
      res.json({ msg: "There's already a user with that email registered." });
      return;
    }

    // if the email doesn't exist we proceed to the creation of that account
    user = await new Visitor({
      name,
      password,
      email,
      isSubscribed,
      gender,
      dateOfBirth,
      city,
    }).save();

    // after creating the account we generate a token and save it into the
    // the tokens collection in the database so we can compare the token
    // later when doing the email verification with their id

    // crate a new token associated with the user id
    const token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();

    // send the verification email to the user
    sendgridEmail(user, token);

    res.status(200);
    res.json({ msg: "Please verify your account." });
  } catch (e) {
    console.log(e.message);
    res.status(400);
    res.json({
      error: "an error occured with the verification link. Try again.",
    });
  }
};



/**
 * TODO: Implement a callback function to handle the req and res to /registration/partner endpoint
 * So here you need to implement the logic to make the registration work
 */

module.exports = {
  registerVisitor,
};
