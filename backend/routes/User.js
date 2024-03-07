// routes/classrooms.js
import express from "express";
import { updateUserIsTeacher } from "../controllers/User.js";

const router = express.Router();

router.put("/:user_id", updateUserIsTeacher);

export default router;
