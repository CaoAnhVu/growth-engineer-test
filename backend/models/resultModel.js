const mongoose = require("mongoose");
const resultSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  totalScore: Number,
  level: String,
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Result", resultSchema);
