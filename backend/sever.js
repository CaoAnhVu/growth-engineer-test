import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/db.js"; // Đảm bảo rằng bạn đã kết nối đúng với MongoDB
import assessmentRoutes from "./routes/assessmentRoutes.js"; // Đảm bảo rằng route đúng
import answerRoutes from "./routes/answerRoutes.js"; // Đảm bảo rằng route đúng

// Load environment variables từ file .env
dotenv.config();

const app = express();

// Middleware để xử lý body JSON trong request
app.use(express.json());

// Routes cho các API
app.use("/api/assessment", assessmentRoutes); // Route cho assessment
app.use("/api/answers", answerRoutes); // Route cho answers

const PORT = process.env.PORT || 5000;

// Lắng nghe trên cổng đã định sẵn
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
