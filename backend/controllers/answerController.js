const express = require("express");
const router = express.Router();
const Answer = require("../models/Answer");
const auth = require("../middleware/auth");

// Tạo câu trả lời mới
router.post("/", auth, async (req, res) => {
  try {
    const { questionId, text } = req.body;
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ msg: "Câu hỏi không tồn tại" });
    }
    const newAnswer = new Answer({
      text,
      user: req.user.id,
      question: questionId,
    });
    await newAnswer.save();
    question.answers.push(newAnswer._id);
    await question.save();
    res.json(newAnswer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
export {};
// ... các route khác cho câu trả lời (update, delete, get by questionId, ...)
