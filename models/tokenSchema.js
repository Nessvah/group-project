const mongoose = require("mongoose");
const { Schema } = mongoose;

/**
 * * This will create a token schema for our generated tokens
 * * for email verification
 */

/**
 * TODO: add expiration time to the token
 */

const tokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "refModel",
    require: true,
  },
  refModel: {
    type: String,
    enum: ["Visitor", "Partner"],
  },
  token: {
    type: String,
    require: true,
  },
});

const Token = mongoose.model("Token", tokenSchema);

module.exports = { Token };
