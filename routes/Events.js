const { Event, validateLogin, validateEvent } = require("../models/events");

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const bcrypt = require("bcrypt");
const express = require("express");
const res = require("express/lib/response");
const router = express.Router();

//* POST register a new event
router.post("/register-event", async (req, res) => {
  try {
    const { error } = validateEvent(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let event = await event.findOne({ name: req.body.name });
    if (event)
      return res.status(400).send(`Name ${req.body.name} already claimed!`);

    const salt = await bcrypt.genSalt(10);
    event = new Event({
      name: req.body.name,
      password: await bcrypt.hash(req.body.password, salt),
      isAdmin: req.body.isAdmin,
    });

    await event.save();
    const token = event.generateAuthToken();
    return res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send({
        _id: event._id,
        name: event.name,
        email: event.email,
        isAdmin: event.isAdmin,
      });
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

module.exports = router;