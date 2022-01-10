const { Group, validateLogin, validateGroup } = require("../models/groups");


const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

//* POST register a new group
router.post("/register-group", async (req, res) => {
  try {
    const { error } = validateGroup(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let group = await Group.findOne({ name: req.body.name });
    if (group)
      return res.status(400).send(`Name ${req.body.name} already claimed!`);

    const salt = await bcrypt.genSalt(10);
    group = new Group({
      name: req.body.name,
      password: await bcrypt.hash(req.body.password, salt),
      isAdmin: req.body.isAdmin,
    });

    await group.save();
    const token = group.generateAuthToken();
    return res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send({
        _id: group._id,
        name: group.name,
        email: group.email,
        isAdmin: group.isAdmin,
      });
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

module.exports = router;