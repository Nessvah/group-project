const mongoose = require("mongoose");
const JoiImport = require("joi");
const JoiDate = require("@joi/date");
const { Schema } = mongoose;
const Joi = JoiImport.extend(JoiDate);

const GENDERS = ["M", "F", "OTHER"];

const visitorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: 8,
    },
    email: {
      type: String,
      required: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
      required: true,
    },
    isSubscribed: {
      type: Boolean,
      required: true,
    },
    gender: {
      type: String,
      enum: GENDERS, // this will only allow values that are inside the GENRES ARRAY
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    passport: {
      pointsWon: [
        {
          // this schema types will make reference with the place schema id
          placeId: { type: Schema.Types.ObjectId, ref: "Place" },
          associatedPoints: Number,
          visitDateTime: {
            type: Date,
            // in case the date is omitted, the default will be the current
            // time that the new document was created
            default: Date.now,
          },
        },
      ],
      pointsSpent: [
        {
          promotionId: { type: Schema.Types.ObjectId, ref: "Promotion" },
          numberOfPoints: Number,
          visitDateTime: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      level: String,
      totalPoints: Number,
    },
    /**
     * * since we want to reference , two possible but different id's from different collections
     * * we need to ref a model and then on that model, define the possible options on an enum
     */
    favorites: [{ type: Schema.Types.ObjectId, ref: "refModel" }],
    refModel: {
      type: String,
      enum: ["Place", "Partner"],
    },
  },
  {
    timestamps: {
      createdAt: "createdAt", // To store the created date
      updatedAt: "updatedAt", // To store the last updated date
    },
  }
);

/**
 * * When creating a document a __v will appear in the database document
 * * The __v field is called the version key. It describes the internal revision of a document.
 * * This __v field is used to track the revisions of a document.
 */

const Visitor = new mongoose.model("Visitor", visitorSchema);

// Validating the user information

const validateUser = (user) => {
  const schema = Joi.object({
    // validate data passed
    name: Joi.string().min(3).max(30),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).min(8),
    repeatPassword: Joi.ref("password"),
    email: Joi.string().email(),
    isSubscribed: Joi.boolean(),
    gender: Joi.string(),
    dateOfBirth: Joi.date()
      .format("DD/MM/YYYY") // set desired date format here
      .raw(),
    city: Joi.string().min(3).max(30),
  });
  // this will return an error if data not valid
  // so we need to handle in the next middleware
  console.log(typeof user.dateOfBirth);
  return schema.validate(user);
};

module.exports = { Visitor, validateUser };
