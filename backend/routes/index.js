import multer from "multer";
import express from "express";
import { upload, uploadVideoBlob, createPost, deletePost, getFeedPosts, getPost, getUserPosts, likeUnlikePost, replyToPost } from "../controllers/answerController.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();
const storage = multer.memoryStorage();

// Endpoint để nhận video upload
router.post("/uploadVideo", upload.single("video"), uploadVideoBlob);

router.get("/user", protectRoute, getUserPosts);
router.get("/feed", protectRoute, getFeedPosts);
router.get("/:id", getPost);
router.post("/create", upload.fields([{ name: "img" }, { name: "video" }]), protectRoute, createPost);
router.delete("/:id", protectRoute, deletePost);
router.post("/like/:id", protectRoute, likeUnlikePost);
router.post("/reply/:id", protectRoute, replyToPost);

export default router;
