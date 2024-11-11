const express = require("express");
const router = express.Router();
const Question = require("../models/Question");
const Answer = require("../models/Answer");
const auth = require("../middleware/auth");

// Tạo câu hỏi mới
router.post("/", auth, async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const newQuestion = new Question({
      title,
      description,
      tags,
      user: req.user.id,
    });
    await newQuestion.save();
    res.json(newQuestion);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Lấy tất cả các câu hỏi
router.get("/", async (req, res) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1 }).populate("user", ["name", "avatar"]);
    res.json(questions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// ... các route khác cho câu hỏi (update, delete, get by id, ...)
