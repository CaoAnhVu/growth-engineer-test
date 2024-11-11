import express from "express";
const router = express.Router();

// Định nghĩa các route cho answers
router.get("/", (req, res) => {
  res.send("Danh sách các câu trả lời");
});

router.post("/", (req, res) => {
  const answerData = req.body;
  // Xử lý dữ liệu và trả về kết quả
  res.json({ message: "Tạo câu trả lời thành công", data: answerData });
});

export default router;
