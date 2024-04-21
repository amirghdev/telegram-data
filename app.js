//* env
require("dotenv").config();

//* database
require("./config/db");

//* imports
const express = require("express");
const cors = require("cors");
const { handleError } = require("./middlewares/handleErrors");
// const { TelegramClient, Api } = require("telegram");
// const { StringSession } = require("telegram/sessions");
//* telegram connection
// const client = require("./config/telegram");
// require("./config/telegram");

// const stringSession = new StringSession(process.env.STRING_SESSION);

// const client = new TelegramClient(stringSession, Number(process.env.API_ID), process.env.API_HASH, {
//   connectionRetries: 5,
// });

// (async () => {
//   client.connect();
// })();

const Posts = require("./models/Posts");
const Channels = require("./models/Channels");
const client = require("./config/telegram");
const { NewMessage } = require("telegram/events");

Channels.find().then((channels) => {
  if (channels.length > 0) {
    handleMessage(channels);
  }
});

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

//* config
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//* routes
app.use("/channels", require("./routes/channels"));

//* handle error
app.use(handleError);

//* 404
app.use("*", (req, res) => {
  res.status(404).json({ message: `آدرس ${req.baseUrl} پیدا نشد` });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});
