const Mongoose = require("mongoose");

const postsSchema = new Mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  channel_id: {
    type: String,
    required: true,
  },
});

const Posts = Mongoose.model("posts", postsSchema);

module.exports = Posts;
