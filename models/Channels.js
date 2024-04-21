const Mongoose = require("mongoose");

const channelsSchema = new Mongoose.Schema({
  channel_id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

const Channels = Mongoose.model("channels", channelsSchema);

module.exports = Channels;
