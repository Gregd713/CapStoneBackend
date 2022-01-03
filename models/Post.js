const mongoose = require("mongoose");

const replySchema = new mongoose.Schema(
  {
      text:{type: String, required: true},
      likes:{type: Number, default: 0},
      dislikes:{type: Number, default: 0},
  }
)

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
    replies:{type: [replySchema], default: []}
  },
  { timestamps: true }
);
const Post = mongoose.model("Post", PostSchema);
const Reply=mongoose.model("Reply", replySchema);
module.exports.Reply = Reply;
module.exports.Post =Post;