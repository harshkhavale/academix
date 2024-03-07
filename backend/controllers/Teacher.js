import Teacher from "../models/Teacher.js";
import User from "../models/User.js";
import multer from "multer";
import path from "path";

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets"); // Images will be stored in public/assets folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Appending timestamp to ensure unique filenames
  },
});

const upload = multer({ storage: storage });

// Create a new teacher
const createTeacher = async (req, res) => {
  try {
    // Destructure data from request body
    const {
      name,
      userId,
      description,
      keywords,
      education,
      experience,
      interests,
      socialLinks,
      location,
    } = req.body;

    // Extract filenames from uploaded files
    console.log(req.files);
    const profilePicture = req.files["profilePicture"][0].filename;
    const coverPicture = req.files["coverPicture"][0].filename;

    const enrolled = []; // Assuming no enrolled users initially

    // Validate user ID
    const user = await User.findById({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create new teacher instance
    const newTeacher = new Teacher({
      name,
      user_id: userId,
      enrolled,
      description,
      keywords: JSON.parse(keywords), // Parse keywords as JSON array
      education: JSON.parse(education), // Parse education as JSON array
      experience,
      interests: JSON.parse(interests), // Parse interests as JSON array
      profilepicture: profilePicture,
      coverpicture: coverPicture,
      sociallinks: JSON.parse(socialLinks), // Parse socialLinks as JSON array
      location,
    });

    // Save teacher to database
    const savedTeacher = await newTeacher.save();

    // Return success response
    res.status(201).json(savedTeacher);
  } catch (error) {
    // Return error response
    res.status(500).json({ message: "Internal server error", error: error });
    console.log(error);
  }
};

// Retrieve all Teacher
const getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json(teachers);
  } catch (error) {
    console.error("Error fetching teachers:", error);
    res
      .status(500)
      .json({ message: "Error fetching teachers", error: error.message });
  }
};
// Retrieve a single teacher by ID
const getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.status(200).json(teacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a teacher by ID
const updateTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    // Update teacher fields
    teacher.name = req.body.name || teacher.name;
    teacher.description = req.body.description || teacher.description;
    teacher.keywords = req.body.keywords || teacher.keywords;
    teacher.education = req.body.education || teacher.education;
    teacher.experience = req.body.experience || teacher.experience;
    teacher.interests = req.body.interests || teacher.interests;
    if (req.file) {
      teacher.profilepicture = req.file.filename; // If new profile picture is uploaded, update it
    }
    const updatedteacher = await teacher.save();
    res.status(200).json(updatedteacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a teacher by ID
const deleteTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    await teacher.remove();
    res.status(200).json({ message: "Teacher deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const enrollTeacher = async (teacherId, userIds) => {
  try {
    // Find the teacher by ID
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      throw new Error("Teacher not found");
    }

    // Validate user IDs
    // You can add more validation if needed, e.g., check if the user exists
    if (!userIds || !Array.isArray(userIds)) {
      throw new Error("Invalid user IDs");
    }

    // Append user IDs to the enrolled array
    teacher.enrolled.push(...userIds);

    // Save the updated teacher
    const updatedteacher = await teacher.save();

    return updatedteacher;
  } catch (error) {
    throw error; // Propagate the error to the caller
  }
};
const getTeacherByUserId = async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ user_id: req.params.user_id });
    if (teacher) {
      res.json(teacher);
    } else {
      res.status(404).json({ message: "Teacher not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getUsersTeacher = async (userId) => {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }

    const Teacher = await Teacher.find({ enrolled: userId });

    return Teacher;
  } catch (error) {
    throw error;
  }
};

const updateTeacherClassrooms = async (req, res) => {
  const { teacherId, classroomId } = req.body;
  try {
    const updatedTeacher = await Teacher.findOneAndUpdate(
      { _id: teacherId },
      { $addToSet: { classrooms: classroomId } }, // Push new classroom ID
      { new: true } // Return the updated document
    );

    if (!updatedTeacher) {
      throw new Error("Teacher not found");
    }
    res.json(updatedTeacher);
    return updatedTeacher;
  } catch (error) {
    console.error("Error updating teacher classrooms:", error);
    throw error; // Propagate the error to the caller
  }
};

export {
  createTeacher,
  getTeachers,
  getTeacherById,
  updateTeacherById,
  deleteTeacherById,
  enrollTeacher,
  getUsersTeacher,
  getTeacherByUserId,
  updateTeacherClassrooms,
  upload,
};
