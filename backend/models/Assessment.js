const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  id: Number,
  text: String,
  score: Number,
});

const questionSchema = new mongoose.Schema({
  id: Number,
  title: String,
  options: [optionSchema],
});

const resultSchema = new mongoose.Schema({
  level: Number,
  name: String,
  description: {
    text: String,
  },
  key_actions: [
    {
      text: String,
    },
  ],
  key_actions_cta: {
    text: String,
    url: String,
  },
  range: [Number],
});

const assessmentSchema = new mongoose.Schema({
  title: String,
  questions: [questionSchema],
  results: [resultSchema],
});

module.exports = mongoose.model("Assessment", assessmentSchema);
