import express from "express";
const router = express.Router();

// Định nghĩa các route cho assessment
router.get("/", (req, res) => {
  res.send("Danh sách các bài đánh giá");
});

router.post("/", (req, res) => {
  const assessmentData = req.body;
  // Xử lý dữ liệu và trả về kết quả
  res.json({ message: "Tạo bài đánh giá thành công", data: assessmentData });
});

export default router;
