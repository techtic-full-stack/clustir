const config = require("dotenv").config();
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.url = config.parsed.DB_URL;
// db.userModel = require("./UserModel")(mongoose);
module.exports = db;
