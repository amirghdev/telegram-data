const Channels = require("../models/Channels");

const client = require("../config/telegram");
const { NewMessage } = require("telegram/events");

const Posts = require("../models/Posts");

module.exports.create = async (req, res, next) => {
  try {
    // 1: check for username
    if (req.body.username == "" || req.body.username == null || req.body.username == undefined) {
      const error = new Error("لطفا آیدی کانال را وارد کنید");
      error.statusCode = 400;
      throw error;
    }

    // 2: check for username be unique
    const channel = await Channels.findOne({ username: req.body.username });

    if (channel != null) {
      const error = new Error("کانال از قبل به لیست اضافه شده است");
      error.stack = 400;
      throw error;
    }

    // 3: check for existing of channel
    const checkChannel = await client.getEntity(req.body.username);

    // 4: create new channel
    const newChannel = await Channels.create({
      channel_id: checkChannel.id,
      username: checkChannel.username,
    });

    // 5: find channel posts
    const posts = await client.getMessages(newChannel.username, { limit: 0 });

    // 6: if there is post add to database
    if (posts.length > 0) {
      for (let index = 0; index < posts.length; index++) {
        if (posts[index].message) {
          await Posts.create({
            message: posts[index].message,
            channel_id: newChannel._id,
          });
        }
      }
    }

    // 7: find all channels and add to handleEvent
    const channels = await Channels.find();

    handleMessage(channels);

    res.status(200).json({ message: "کانال و پیام ها ذخیره شدند" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

async function handleMessage(channels) {
  const usernames = [];
  for (let index = 0; index < channels.length; index++) {
    usernames.push(channels[index].username);
  }
  client.addEventHandler(handler, new NewMessage({ chats: usernames }));
  async function handler(event) {
    for (let index = 0; index < channels.length; index++) {
      if (event.message.peerId.channelId == channels[index].channel_id) {
        await Posts.create({
          message: event.message.message,
          channel_id: channels[index].channel_id,
        });
      }
    }
  }
}
