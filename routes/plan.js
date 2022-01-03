const router = require("express").Router();
const {Plan} = require("../models/plan");
const {User} = require("../models/user");

//create a plan

router.post("/", async (req, res) => {
  const newPlan = new Plan(req.body);
  try {
    const savedPlan = await newPlan.save();
    res.status(200).json(savedPlan);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update a plan

router.put("/:id", async (req, res) => {
    try {
      const plan = await Plan.findById(req.params.id);
      if (plan.userId === req.body.userId) {
        await plan.updateOne({ $set: req.body });
        res.status(200).json("the post has been updated");
      } else {
        res.status(403).json("you can update only your post");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;