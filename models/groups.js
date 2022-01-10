const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const groupSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, minLength: 5, maxLength: 255 },
    password: { type: String, required: true, default:""},
    isAdmin: { type: Boolean, required: true },
    profilePicture: {
      type: String,
      default: "",
    },
    
    coverPicture: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
      max: 50,
    },
    city: {
      type: String,
      max: 50,
    },
    state: {
        type: String,
        max: 50,
      },
    branch: {
      type: String,
      max: 50,
    },
  },
  { timestamps: true }
);

groupSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      desc: this.desc,
      city: this.city,
      state: this.state,
      isAdmin: this.isAdmin,
    },
    config.get("JWT_SECRET")
  );
};

const validateGroup = (group) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    password: Joi.string().min(5).max(1024).required(),
    desc:Joi.string().min(2).max(50).required(),
    city:Joi.string().min(2).max(50).required(),
    state:Joi.string().min(2).max(50).required(),
    isAdmin: Joi.bool().required(),
  });
  return schema.validate(group);
};

const validateLogin = (req) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  });
  return schema.validate(req);
};

const Group = mongoose.model("Group", groupSchema);
module.exports.Group = Group;
module.exports.groupSchema = groupSchema;
module.exports.validateGroup = validateGroup;
module.exports.validateLogin = validateLogin;
