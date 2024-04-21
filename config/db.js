const Mongoose = require("mongoose");

Mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("database connected !...");
  })
  .catch((err) => {
    console.log(err);
  });
