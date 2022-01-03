const mongoose = require("mongoose");

const PlanSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    step1: {
      type: String,
      max: 5000,
    },
    step2: {
      type: String,
      max: 5000,
    },
    step3: {
      type: Array,
      max: 5000,
    },
    step4: {
        type: Array,
        max: 5000,
      },
      step5: {
        type: Array,
        max: 5000,
      },
      step6: {
        type: Array,
        max: 5000,
      },
      step7: {
        type: Array,
        max: 5000,
      },
      step8: {
        type: Array,
        max: 5000,
      },
      step9: {
        type: Array,
        max: 5000,
      },
      step10: {
        type: Array,
        max: 5000,
      },
  },
  { timestamps: true }
);
const Plan = mongoose.model("Plan", PlanSchema);
module.exports.Plan =Plan;