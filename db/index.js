const mongoose = require("mongoose");

const DB_URI = process.env.MONGO_URI;

mongoose.connect(DB_URI);

module.exports = mongoose;
