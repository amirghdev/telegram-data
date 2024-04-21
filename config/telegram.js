const { TelegramClient, Api } = require("telegram");
const { StringSession } = require("telegram/sessions");
const { NewMessage } = require("telegram/events");
const input = require("input");

// 1BAAOMTQ5LjE1NC4xNjcuOTEAUDGyvTajUExadIU+AAWKmvEH1bLjzsQntBIivUc4IN+FEtDNxzO/yyfWrlGij9ntITdOdQ+w4J4U9kx6cPQgyq/rFn2bSe2MU3fmHlcoisu3lMHyk3L/GH+N6TqXMiPKqYnS4yEyyaQozPtNEU7CSbq/LYg39HO4ZBEvRPkLSqZX2qAWPBLkPaem0NALQYgahDKqnznaGoqNcFEiGjaSTR8vJj78gwlsJjy9E7NcOxMTwrJ8PgK+5jAaeoq2SZrW7hilfOAfg0dc8P4/LvF4XZK6WPx+kY/eRpR1Cp6S6X+kyEzFAYkFRpMwktwvPs2wDSfoGguZFCJ2sV3MHcV6RTA=
const stringSession = new StringSession(process.env.STRING_SESSION);
// (async () => {
//   const client = new TelegramClient(stringSession, Number(process.env.API_ID), process.env.API_HASH, {
//     connectionRetries: 5,
//   });
//   //   await client.start({
//   //     phoneNumber: async () => await input.text("number ?"),
//   //     password: async () => await input.text("password?"),
//   //     phoneCode: async () => await input.text("Code ?"),
//   //     onError: (err) => console.log(err),
//   //   });
//   await client.connect();
//   console.log("You should now be connected.");
//   //   console.log(client.session.save()); // Save this string to avoid logging in again
//   //   await client.sendMessage("me", { message: "test" });
//   //   const messages = await client.getMessages("data_test_channel", { limit: 0 });
//   //   messages.forEach((message) => {
//   //     console.log(message.message);
//   //   });
//   client.addEventHandler(handler, new NewMessage({ chats: ["data_test_channel", "data_test_channel2"] }));
//   async function handler(event) {
//     // console.log(event.message.message);
//     console.log(event.message);
//   }
// })();
const client = new TelegramClient(stringSession, Number(process.env.API_ID), process.env.API_HASH, {
  connectionRetries: 5,
});

(async () => {
  client.connect();
})();

module.exports = client;

// client.connect().then(async () => {
//   //   const result = await client.getEntity("data_test_channel");
//   //   console.log(result.id.value);
//   //   console.log(result.username);
//   module.exports = client;
// });
