const mongoose = require("mongoose");
const env = require("../env");
module.exports = async () => {
  await mongoose.connect(env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

