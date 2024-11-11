const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  email: String,
  answers: Map,
  score: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Answer", answerSchema);
