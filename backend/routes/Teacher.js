import express from "express";
import {
  createTeacher,
  getTeachers,
  getTeacherById,
  updateTeacherById,
  deleteTeacherById,
  enrollTeacher,
  getUsersTeacher,
  upload,
} from "../controllers/Teacher.js";

const router = express.Router();

// Route for creating a new teacher
router.post(
  "/",
  upload.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "coverPicture", maxCount: 1 },
  ]),
  createTeacher
);

router.get("/", getTeachers);

router.get("/:id", getTeacherById);

router.put("/:id", upload.single("profilePicture"), updateTeacherById);

router.delete("/:id", deleteTeacherById);

router.post("/:teacherId/enroll", async (req, res) => {
  const { teacherId } = req.params;
  const { userIds } = req.body;

  try {
    // Call the enrollTeacher function
    const updatedTeacher = await enrollTeacher(teacherId, userIds);

    res.status(200).json(updatedTeacher);
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: error.message });
  }
});
router.get("/users/:userId/teachers", async (req, res) => {
  const { userId } = req.params;

  try {
    // Call the getUsersTeacher function
    const teachers = await getUsersTeacher(userId);

    res.status(200).json(teachers);
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: error.message });
  }
});

export default router;
