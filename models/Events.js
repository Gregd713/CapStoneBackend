const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const eventSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, minLength: 5, maxLength: 255 },
    password: { type: String, required: true, minLength: 8, maxLength: 1024 },
    isAdmin: { type: Boolean, required: true },
    profilePicture: {
      type: String,
      default: "",
    },
    
    time: {
      type: String,
      default: "",
    },
    place: {
        type: String,
        default: "",
    },
    date: {
        type: String,
        default: "",
    },
    desc: {
      type: String,
      max: 50,
    },
  },
  { timestamps: true }
);

eventSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      isAdmin: this.isAdmin,
    },
    config.get("JWT_SECRET")
  );
};

const validateEvent = (event) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    password: Joi.string().min(5).max(1024).required(),
    isAdmin: Joi.bool().required(),
  });
  return schema.validate(event);
};

const validateLogin = (req) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  });
  return schema.validate(req);
};

const Event = mongoose.model("Event", eventSchema);
module.exports.Event = Event;
module.exports.eventSchema = eventSchema;
module.exports.validateEvent = validateEvent;
module.exports.validateLogin = validateLogin;

