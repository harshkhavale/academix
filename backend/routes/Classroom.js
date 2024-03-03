// routes/classrooms.js
import express from "express";
import {
  createClassroom,
  getAllClassrooms,
  getClassroomById,
  updateClassroom,
  deleteClassroom,
  getClassroomsByTeacherId,
} from "../controllers/Classroom.js";

const router = express.Router();

// Create a new classroom
router.post("/", createClassroom);

// Get all classrooms
router.get("/", getAllClassrooms);

// Get a specific classroom by ID
router.get("/:id", getClassroomById);

// Get classrooms by teacher ID
router.get("/teacher/:teacher_id", getClassroomsByTeacherId);

// Get classrooms by user enrollment

// Update a classroom by ID
router.put("/:id", updateClassroom);

// Delete a classroom by ID
router.delete("/:id", deleteClassroom);

export default router;
