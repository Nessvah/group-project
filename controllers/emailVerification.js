/**
 * TODO: Implement a callback function to handle the verification of the token sent by email
 */

const verifyEmailSentController = async (req, res) => {
  res.json({ msg: "verify" });
};

module.exports = { verifyEmailSentController };
